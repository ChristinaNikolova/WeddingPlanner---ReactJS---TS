import express from "express";
import homeRoutes from "../controllers/home";
import authRoutes from "../controllers/auth";
import categoriesRoutes from "../controllers/categories";
import articlesRoutes from "../controllers/articles";
import costsRoutes from "../controllers/costs";
import eventsRoutes from "../controllers/events";
import guestsRoutes from "../controllers/guests";
import notesRoutes from "../controllers/notes";
import plannersRoutes from "../controllers/planners";
import subtasksRoutes from "../controllers/subtasks";
import tasksRoutes from "../controllers/tasks";
import usersRoutes from "../controllers/users";
import adminArticlesController from "../controllers/admin/articles";
import adminCategoriesController from "../controllers/admin/categories";

export default function routesConfig(app: express.Application): void {
  app.use("/", homeRoutes);
  app.use("/auth", authRoutes);
  app.use("/categories", categoriesRoutes);
  app.use("/articles", articlesRoutes);
  app.use("/costs", costsRoutes);
  app.use("/events", eventsRoutes);
  app.use("/guests", guestsRoutes);
  app.use("/notes", notesRoutes);
  app.use("/planners", plannersRoutes);
  app.use("/subtasks", subtasksRoutes);
  app.use("/tasks", tasksRoutes);
  app.use("/users", usersRoutes);
  app.use("/admin/articles", adminArticlesController);
  app.use("/admin/categories", adminCategoriesController);
}
