import express from "express";
import bodyParser from "body-parser";
import LoggingMiddleware from "./logging";

import flavour from "./GraphQL/flavour";
import ingredient from "./GraphQL/ingredient";
import flavour_ingredient from "./GraphQL/flavour_ingredient";
import order from "./GraphQL/order";

import cors from "cors";
import config from "./config";
import { ApolloServer } from "apollo-server-express";

const port = config.APP_PORT;

async function startServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(LoggingMiddleware());

  const server = new ApolloServer({
    modules: [flavour, ingredient, flavour_ingredient, order],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.get("/", (_, res) => res.send("working"));

  app.listen({ port: port }, () =>
    console.log(`Server ready at http://localhost:${port}`)
  );
}

startServer();
