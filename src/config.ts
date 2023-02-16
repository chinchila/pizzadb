import dotenv from "dotenv";
dotenv.config();

export default {
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: parseInt(process.env.DB_PORT ?? "3306"),
  DB_NAME: process.env.DB_NAME ?? "pizzadb",
  DB_USER: process.env.DB_USER ?? "graphql",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",

  APP_PORT: parseInt(process.env.APP_PORT ?? "3001"),
};
