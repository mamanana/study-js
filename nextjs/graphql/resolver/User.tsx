import { GraphQLError } from 'graphql'
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateEmail, validateEmpty, validatePassword } from '@/untils/formValidators'
const APP_SECRET = "GraphQL-is-aw3some";

const cookieOptions = {
  // cookie is valid for all subpaths of my domain
  path: "/",
  // this cookie won't be readable by the browser
  httpOnly: true,
  // and won't be usable outside of my domain
  sameSite: "strict",
};

const setCookieToken = (cookie, token) => {
  cookie("token", token, {
    ...cookieOptions,
    // set time cookies will be delete
    maxAge: 60 * 60 * 24,
  });
};

const removeCookieToken = (cookie) => {
  cookie("token", "", {
    ...cookieOptions,
    // set time cookies will be delete
    maxAge: 0,
  });
};

const requireFields = {email: [validateEmail, validateEmpty], firstname: [validateEmpty], lastname: [validateEmpty], passowrd: [validateEmpty]};

const validate = (args) => {
  for(let i in requireFields) {
    const requireField = requireFields[i];
    requireField.forEach(func => {
      const message = func(args[i] || '')
      if(message) throw new GraphQLError(message)
    })
  }
}

export const register = async (parent, args, ctx) => {
  const { cookie } = ctx;

  validate(args)

  const password = await bcrypt.hash(args.password, 10);

  const user = await prisma.user.findUnique({
    where: { email: args.email },
  });

  if(!!user) {
    throw new GraphQLError("There is already an account with this email address")
  }

  const newUser = await prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: newUser.id }, APP_SECRET);

  setCookieToken(cookie, token);

  return {
    token,
    user: newUser,
  };
};

export const login = async (parent, args, ctx) => {
  const { cookie } = ctx;
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

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  setCookieToken(cookie, token);

  return {
    token,
    user,
  };
};

export const logout = async (parent, args, ctx) => {
  const { cookie } = ctx;
  
  removeCookieToken(cookie)

  return {
    status: true
  }
};
