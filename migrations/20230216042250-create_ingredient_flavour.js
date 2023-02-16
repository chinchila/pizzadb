"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const IngredientTable = queryInterface.createTable("flavour_ingredient", {
      id: {
        type: Sequelize.DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: Sequelize.DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
      },
      flavour_id: {
        type: Sequelize.DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
      },
      ingredient_id: {
        type: Sequelize.DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
      },
    });

    return IngredientTable;
  },

  down: (queryInterface) => queryInterface.dropTable("flavour"),
};
