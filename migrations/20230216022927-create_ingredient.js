"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const IngredientTable = queryInterface.createTable("ingredient", {
      id: {
        type: Sequelize.DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(64),
        allowNull: false,
      },
      cost: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      unit: {
        type: Sequelize.DataTypes.ENUM("slices", "grams", "pizza"),
        allowNull: false,
      },
    });

    return IngredientTable;
  },

  down: (queryInterface) => queryInterface.dropTable("ingredient"),
};
