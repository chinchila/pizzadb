import { gql } from "apollo-server-express";
import db from "../db";

export const typeDefs = gql`
  extend type Query {
    flavours: [Flavour]
    flavour(id: ID!): Flavour
  }
  type Flavour {
    id: ID!
    name: String
    price: Float
  }
`;

export const resolvers = {
  Query: {
    flavours: async () => db.flavour.findAll(),
    flavour: async (_: any, args: any, __: any, ___: any) =>
      db.flavour.findByPk(args.id),
  },
};

export default { typeDefs, resolvers };
