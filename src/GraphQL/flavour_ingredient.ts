import { gql } from "apollo-server-express";
import db from "../db";

export const typeDefs = gql`
  extend type Query {
    flavour_ingredients: [FlavourIngredient]
    flavour_ingredient(id: ID!): FlavourIngredient
  }
  type FlavourIngredient {
    id: ID!
    amount: Int
    flavour: Flavour
    ingredient: Ingredient
  }
`;

export const resolvers = {
  Query: {
    flavour_ingredients: async () => {
      const t = await db.flavour_ingredient.findAll({
        include: [db.flavour, db.ingredient],
      });
      console.log(t);
      return t;
    },
    flavour_ingredient: async (_: any, args: any, __: any, ___: any) =>
      db.flavour_ingredient.findByPk(args.id, {
        include: [db.flavour, db.ingredient],
      }),
  },
};

export default { typeDefs, resolvers };
