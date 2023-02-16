import { Sequelize, DataTypes } from "sequelize";

export default function (sequelize: Sequelize) {
  return sequelize.define(
    "flavour",
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
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "flavour",
      timestamps: false,
    }
  );
}
