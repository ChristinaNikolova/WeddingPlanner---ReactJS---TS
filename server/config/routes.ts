import express from "express";
import homeRoutes from "../controllers/home";
import authRoutes from "../controllers/auth";
import categoriesRoutes from "../controllers/categories";
import articlesRoutes from "../controllers/articles";
import adminArticlesController from "../controllers/admin/articles";
import adminCategoriesController from "../controllers/admin/categories";

export default function routesConfig(app: express.Application): void {
  app.use("/", homeRoutes);
  app.use("/auth", authRoutes);
  app.use("/categories", categoriesRoutes);
  app.use("/articles", articlesRoutes);
  app.use("/admin/articles", adminArticlesController);
  app.use("/admin/categories", adminCategoriesController);
}
