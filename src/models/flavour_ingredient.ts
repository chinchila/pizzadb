import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize) {
  return sequelize.define(
    "flavour_ingredient",
    {
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "flavour_ingredient",
      timestamps: false,
      underscored: true,
    }
  );
}
