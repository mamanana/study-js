import { builder } from "../builder";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

const APP_SECRET = "GraphQL-is-aw3some";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});

const AuthPayload = builder.simpleObject("AuthPayload", {
  fields: (t) => ({
    token: t.string({
      nullable: false,
    }),
    user: t.prismaField({
      type: "User",
    }),
  }),
});

builder.mutationField("signup", (t) =>
  t.field({
    type: AuthPayload,
    args: {
      email: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (parent, args, ctx) => {
      const { cookie } = ctx
      const password = await bcrypt.hash(args.password, 10);

      const user = await prisma.user.create({
        data: { ...args, password },
      });

      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      // the password is correct, set a cookie on the response
      cookie('auth', token, {
        // cookie is valid for all subpaths of my domain
        path: '/',
        // this cookie won't be readable by the browser
        httpOnly: true,
        // and won't be usable outside of my domain
        sameSite: 'strict',
      })
      // console.log(args)
      return {
        token,
        user,
      };
    },
  })
);

builder.mutationField("login", (t) =>
  t.field({
    type: AuthPayload,
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (parent, args, context) => {
      console.log(context)
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

      return {
        token,
        user,
      };
    },
  })
);
