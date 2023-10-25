import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import prisma from "../lib/prisma";
import { DateResolver } from "graphql-scalars";
// import { createContext } from './context'

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  // Context: ReturnType<typeof createContext>,
}>({
  plugins: [PrismaPlugin, SimpleObjectsPlugin],
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("Date", DateResolver, {});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.mutationType({});
