"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "ingredient",
      [
        {
          name: "Pepperoni",
          cost: 0.12,
          unit: "slices",
        },
        {
          name: "Cheese",
          cost: 0.07,
          unit: "grams",
        },
        {
          name: "Vedgetable",
          cost: 0.3,
          unit: "grams",
        },
        {
          name: "Dough",
          cost: 1.1,
          unit: "pizza",
        },
        {
          name: "Sauce",
          cost: 0.78,
          unit: "pizza",
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("ingredient", null, {}),
};
