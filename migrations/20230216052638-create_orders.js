"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const IngredientTable = queryInterface.createTable("order", {
      id: {
        type: Sequelize.DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: Sequelize.DataTypes.DATEONLY(),
        allowNull: false,
      },
      flavour_id: {
        type: Sequelize.DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        references: { model: "flavour", key: "id" },
      },
    });

    return IngredientTable;
  },

  down: (queryInterface) => queryInterface.dropTable("order"),
};
