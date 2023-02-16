"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const IngredientTable = queryInterface.createTable("flavour", {
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
      price: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    });

    return IngredientTable;
  },

  down: (queryInterface) => queryInterface.dropTable("flavour"),
};
