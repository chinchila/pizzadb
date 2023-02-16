"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "flavour",
      [
        {
          name: "Pepperoni",
          price: 19.0,
        },
        {
          name: "Branco",
          price: 15.0,
        },
        {
          name: "All Dressed",
          price: 21.0,
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("flavour", null, {}),
};
