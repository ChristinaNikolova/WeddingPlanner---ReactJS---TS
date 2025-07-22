import express from "express";
import homeRoutes from "../controllers/home";
import authRoutes from "../controllers/auth";

export default function routesConfig(app: express.Application): void {
  app.use("/", homeRoutes);
  app.use("/auth", authRoutes);
}
