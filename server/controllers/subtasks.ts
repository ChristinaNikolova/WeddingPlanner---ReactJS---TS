import { Request, Response, Router } from "express";
import guards from "../middlewares/guards";
import subtasks from "../services/subtasks";
import parser from "../utils/parser";

const router = Router();
const { hasUser } = guards;
const { create, done, deleteById, update, getById } = subtasks;
const { mapErrors } = parser;

router.post(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = req.params.id;
      const subtask = await create(taskId, req.body.description);
      res.json(subtask);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.post(
  "/:taskId/:subtaskId",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = req.params.taskId;
      const subtaskId = req.params.subtaskId;

      const subtask = await done(taskId, subtaskId);
      res.json(subtask);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.delete(
  "/:taskId/:subtaskId",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = req.params.taskId;
      const subtaskId = req.params.subtaskId;

      const subtask = await deleteById(taskId, subtaskId);
      res.json(subtask);
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
      const subtask = await update(id, req.body.description);
      res.json(subtask);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.get(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const subtask = await getById(id, true);
      res.json(subtask);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
