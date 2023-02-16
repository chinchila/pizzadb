import { gql } from "apollo-server-express";
import db from "../db";
import moment from "moment";

const { Op } = require("sequelize");

export const typeDefs = gql`
  extend type Query {
    orders(
      startDate: String
      endDate: String
      month: String
      flavour: [String]
    ): [Order]
  }
  type Order {
    startDate: String
    endDate: String
    unitsSold: Int
    ingredientsUsed: Int
    costOfIngredients: Float
    sales: Float
    profit: Float
    flavour: Flavour
  }
`;

export const resolvers = {
  Query: {
    orders: async (_: any, args: any, __: any, ___: any) => {
      let findOptions: any = {
        attributes: {
          include: [
            [
              db.sequelize.fn(
                "DATE_FORMAT",
                db.sequelize.fn("MIN", db.sequelize.col("order.date")),
                "%b %d %Y"
              ),
              "startDate",
            ],
            [
              db.sequelize.fn(
                "DATE_FORMAT",
                db.sequelize.fn("MAX", db.sequelize.col("order.date")),
                "%b %d %Y"
              ),
              "endDate",
            ],
            [
              db.sequelize.literal(
                "COUNT(`order`.`id`)/COUNT(DISTINCT `flavour->flavour_ingredients->ingredient`.`id`)"
              ),
              "unitsSold",
            ],
            [
              db.sequelize.fn(
                "SUM",
                db.sequelize.col("flavour.flavour_ingredients.amount")
              ),
              "ingredientsUsed",
            ],
            [
              db.sequelize.fn(
                "SUM",
                db.sequelize.literal(
                  "`flavour->flavour_ingredients->ingredient`.`cost`*`flavour->flavour_ingredients`.`amount`"
                )
              ),
              "costOfIngredients",
            ],
            [
              db.sequelize.literal(
                "SUM(`flavour`.`price`)/COUNT(DISTINCT `flavour->flavour_ingredients->ingredient`.`id`)"
              ),
              "sales",
            ],
            [
              db.sequelize.literal(
                "(SUM(`flavour`.`price`)/COUNT(DISTINCT `flavour->flavour_ingredients->ingredient`.`id`))-SUM(`flavour->flavour_ingredients->ingredient`.`cost`*`flavour->flavour_ingredients`.`amount`)"
              ),
              "profit",
            ],
          ],
        },
        group: [db.sequelize.literal("YEARWEEK(date)"), "flavour.id"],
        raw: true,
        nest: true,
      };
      if (args.startDate && args.endDate) {
        findOptions.where = {
          date: {
            [Op.lte]: moment(args.endDate).toDate(),
            [Op.gte]: moment(args.startDate).toDate(),
          },
        };
      } else if (args.month) {
        findOptions.where = {
          date: {
            [Op.lte]: moment()
              .year(2022)
              .month(args.month)
              .endOf("month")
              .toDate(),
            [Op.gte]: moment()
              .year(2022)
              .month(args.month)
              .startOf("month")
              .toDate(),
          },
        };
      }
      findOptions.include = [
        {
          model: db.flavour,
          required: true,
          include: {
            model: db.flavour_ingredient,
            required: true,
            include: {
              model: db.ingredient,
              required: true,
            },
          },
        },
      ];
      if (args.flavour) {
        if (args.flavour.length > 0) {
          findOptions.include[0].where = {
            name: args.flavour,
          };
        }
      }
      return db.order.findAll(findOptions);
    },
  },
};

export default { typeDefs, resolvers };
