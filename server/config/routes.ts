import express from "express";
import homeRoutes from "../controllers/home";
import authRoutes from "../controllers/auth";
import categoriesRoutes from "../controllers/categories";
import articlesRoutes from "../controllers/articles";

export default function routesConfig(app: express.Application): void {
  app.use("/", homeRoutes);
  app.use("/auth", authRoutes);
  app.use("/categories", categoriesRoutes);
  app.use("/articles", articlesRoutes);
}
