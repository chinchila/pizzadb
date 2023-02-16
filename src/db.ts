import { Sequelize } from "sequelize";
import flavour from "./models/flavour";
import ingredient from "./models/ingredient";
import config from "./config";

type ModelList = {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any;
};

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: {},
  }
);

var db: ModelList = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  flavour: flavour,
  ingredient: ingredient,
};

let models = [flavour, ingredient];

// Initialize models
models.forEach((model) => {
  const seqModel = model(sequelize);
  db[seqModel.name] = seqModel;
});

// Apply associations
Object.keys(db).forEach((key) => {
  if ("associate" in db[key]) {
    db[key].associate(db);
  }
});

// Add relations
db.flavour.belongsToMany(db.ingredient, {
  through: "flavour_ingredient",
  as: "ingredients",
  foreignKey: "flavour_id",
});

db.ingredient.belongsToMany(db.flavour, {
  through: "flavour_ingredient",
  as: "flavours",
  foreignKey: "ingredient_id",
});

export default db;
