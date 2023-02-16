import { gql } from "apollo-server-express";
import db from "../db";

export const typeDefs = gql`
  extend type Query {
    ingredients: [Ingredient]
    ingredient(id: ID!): Ingredient
  }
  type Ingredient {
    id: ID!
    name: String
    cost: Float
    unit: String
  }
`;

export const resolvers = {
  Query: {
    ingredients: async () => db.ingredient.findAll(),
    ingredient: async (_: any, args: any, __: any, ___: any) =>
      db.ingredient.findByPk(args.id),
  },
};

export default { typeDefs, resolvers };
