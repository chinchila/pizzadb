import { gql } from "apollo-server-express";
import db from "../db";

export const typeDefs = gql`
  extend type Query {
    orders: [Order]
    order(id: ID!): Order
  }
  type Order {
    id: ID!
    date: String
    flavour: Flavour
  }
`;

export const resolvers = {
  Query: {
    orders: async () =>
      db.order.findAll({
        include: [
          {
            model: db.flavour,
            include: [
              { model: db.flavour_ingredient, include: [db.ingredient] },
            ],
          },
        ],
        raw: true,
        nest: true,
      }),
    order: async (_: any, args: any, __: any, ___: any) =>
      db.order.findByPk(args.id, {
        include: [
          {
            model: db.flavour,
            include: [
              { model: db.flavour_ingredient, include: [db.ingredient] },
            ],
          },
        ],
        raw: true,
        nest: true,
      }),
  },
};

export default { typeDefs, resolvers };
