import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

export const register = async (parent, args, ctx) => {
  const { cookie } = ctx;
  const password = await bcrypt.hash(args.password, 10);

  const user = await prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  setCookieToken(cookie, token);

  return {
    token,
    user,
  };
};

export const login = async (parent, args, ctx) => {
  const { cookie } = ctx;
  const user = await prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
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
