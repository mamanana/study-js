import { builder } from "../builder";
import {login, logout, signup} from "../resolver/User"

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
    resolve: signup,
  })
);

builder.mutationField("login", (t) =>
  t.field({
    type: AuthPayload,
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: login
  })
);

const LogoutOutput = builder.simpleObject('LogoutOutput', {
  fields: (t) => ({
    status: t.boolean({})
  })
})

builder.mutationField('logout', (t) => 
  t.field({
    type: LogoutOutput,
    resolve: logout
  })
)
