import { builder } from "../builder";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString('name'),
    createdAt: t.expose("createdAt", {
        type: "Date",
    }),
  }),
});



builder.mutationField("signup", (t) => 
    t.prismaField({
        type: 'User',
        args: {
            email: t.arg.string({ required: true }),
            name: t.arg.string({ required: true }),
            password: t.arg.string({ required: true })
        },
        resolve: async (query, _parent, args, ctx) => {
            console.log(args)
            return {
                id: 1,
                ...args,
                createdAt: '2023-01-01'
            };
        }
    })
)

