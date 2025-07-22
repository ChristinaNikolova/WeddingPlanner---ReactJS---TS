import express from "express";
import cors from "../middlewares/cors";
import session from "../middlewares/session";
import trimBody from "../middlewares/trimBody";

export default function expressConfig(app: express.Application): void {
  app.use(express.json());
  app.use(cors());
  app.use(trimBody());
  app.use(session());
}
