import { Sequelize } from "sequelize";
import flavour from "./models/flavour";
import ingredient from "./models/ingredient";
import flavour_ingredient from "./models/flavour_ingredient";
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
};

let models = [flavour, ingredient, flavour_ingredient];

// Initialize models
models.forEach((model) => {
  const seqModel = model(sequelize);
  db[seqModel.name] = seqModel;
});

// Add relations
// db.flavour.belongsToMany(db.ingredient, {
//   through: db.flavour_ingredient,
//   foreignKey: "flavour_id",
// });
db.flavour.hasMany(db.flavour_ingredient);

// db.ingredient.belongsToMany(db.flavour, {
//   through: db.flavour_ingredient,
//   foreignKey: "ingredient_id",
// });
db.ingredient.hasMany(db.flavour_ingredient);

db.flavour_ingredient.belongsTo(db.flavour);
db.flavour_ingredient.belongsTo(db.ingredient);

export default db;
