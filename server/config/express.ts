import express from "express";
import cors from "../middlewares/cors";

export default (app: express.Application) => {
  app.use(cors());
};
