import { Request, Response, Router } from "express";
import guards from "../middlewares/guards";
import tasks from "../services/tasks";
import parser from "../utils/parser";

const router = Router();
const { hasUser } = guards;
const { all, create, update, deleteById, getById } = tasks;
const { mapErrors } = parser;

router.get(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const plannerId = req.params.id;
      const tasks = await all(plannerId);
      res.json(tasks);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.post(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const plannerId = req.params.id;
      const task = await create(
        plannerId,
        req.body.title,
        req.body.description,
        req.body.timespan
      );
      res.json(task);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.delete(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const task = await deleteById(id);
      res.json(task);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.put(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const task = await update(id, req.body.title, req.body.description);
      res.json(task);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.get(
  "/:plannerId/:taskId",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.taskId;
      const task = await getById(id, true);
      res.json(task);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
