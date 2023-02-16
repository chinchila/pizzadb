import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize) {
  return sequelize.define(
    "ingredient",
    {
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      unit: {
        type: DataTypes.ENUM("slices", "grams", "pizza"),
        allowNull: false,
      },
    },
    {
      tableName: "ingredient",
      timestamps: false,
    }
  );
}
