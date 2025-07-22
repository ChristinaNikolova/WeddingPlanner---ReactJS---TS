import express from "express";
import authRoutes from "../controllers/auth";
import homeRoutes from "../controllers/home";

export default function routesConfig(app: express.Application): void {
  app.use("/", homeRoutes);
  app.use("/auth", authRoutes);
}
