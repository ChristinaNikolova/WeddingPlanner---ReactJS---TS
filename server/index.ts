import express from "express";
import connectDB from "./config/database";
import expressConfig from "./config/express";
import routesConfig from "./config/routes";
import global from "./utils/constants/global";

const { messages } = global;

async function start(): Promise<void> {
  const app = express();

  expressConfig(app);
  await connectDB();
  routesConfig(app);

  app.listen(3030, () => console.log(messages.REST_STARTED));
}

start();
