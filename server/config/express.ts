import express from "express";
import cors from "../middlewares/cors";
import session from "../middlewares/session";

export default (app: express.Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(session());
};
