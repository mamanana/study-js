import { builder } from "../builder";
import prisma from "../../lib/prisma";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
    resolve: async (parent, args) => {
      const password = await bcrypt.hash(args.password, 10);

      const user = await prisma.user.create({
        data: { ...args, password },
      });

      const token = jwt.sign({ userId: user.id }, APP_SECRET);
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
    resolve: async (parent, args) => {
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
