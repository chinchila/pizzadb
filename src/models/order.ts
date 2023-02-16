import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize) {
  return sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATEONLY(),
        allowNull: false,
      },
    },
    {
      tableName: "order",
      timestamps: false,
      underscored: true,
    }
  );
}
