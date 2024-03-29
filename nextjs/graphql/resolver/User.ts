import type { NextApiResponse } from "next";

import { GraphQLError } from "graphql";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/untils/auth";
import {
  validateEmail,
  isRequired,
  validatePassword,
} from "@/untils/formValidators";
import { cookie } from "@/untils/cookie";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const cookieOptions = {
  // cookie is valid for all subpaths of my domain
  path: "/",
  // this cookie won't be readable by the browser
  httpOnly: true,
  // and won't be usable outside of my domain
  sameSite: "strict",
};

const setCookieToken = (res: NextApiResponse, token: string) => {
  cookie(res, "token", token, {
    ...cookieOptions,
    // set time cookies will be delete
    maxAge: 60 * 60 * 24,
  });
};

const removeCookieToken = (res: NextApiResponse) => {
  cookie(res, "token", "", {
    ...cookieOptions,
    // set time cookies will be delete
    maxAge: 0,
  });
};

const requireFields = {
  email: [validateEmail, isRequired],
  firstname: [isRequired],
  lastname: [isRequired],
  password: [validatePassword, isRequired],
};

const validate = (args) => {
  for (let i in requireFields) {
    const requireField = requireFields[i];
    requireField.forEach((func) => {
      const message = func(args[i] || "");
      if (message) {
        const label = i.charAt(0).toUpperCase() + i.slice(1);
        throw new GraphQLError(`${label}: ${message}`);
      }
    });
  }
};

export const register = async<Types extends SchemaTypes>(parent: PothosSchemaTypes.ParentShape, args, ctx: Context) => {
  const { cookie } = ctx;

  validate(args);

  const existedUser = await prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!!existedUser) {
    throw new GraphQLError(
      "There is already an account with this email address",
    );
  }

  const password = await bcrypt.hash(args.password, 10);

  const user = await prisma.user.create({
    data: { ...args, password },
  });

  const token = await new SignJWT({
    userId: user.id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getJwtSecretKey());

  setCookieToken(cookie, token);

  return {
    user,
  };
};

export const login = async (parent, args, ctx) => {
  const { res } = ctx;
  const user = await prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new GraphQLError("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new GraphQLError("Invalid password");
  }

  const token = await new SignJWT({
    userId: user.id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getJwtSecretKey());

  setCookieToken(res, token);

  return {
    user,
  };
};

export const logout = async (parent, args, ctx) => {
  const { res } = ctx;

  removeCookieToken(res);

  return {
    status: true,
  };
};
