import { Request, Response, Router } from "express";
import costs from "../services/costs";
import guards from "../middlewares/guards";
import parser from "../utils/parser";

const router = Router();
const { all, create, update, deleteById, getById } = costs;
const { hasUser } = guards;
const { mapErrors } = parser;

router.get(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const plannerId = req.params.id;
      const costs = await all(plannerId);
      res.json(costs);
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
      const cost = await create(
        plannerId,
        req.body.title,
        req.body.price,
        req.body.category
      );
      res.json(cost);
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
      const cost = await deleteById(id);
      res.json(cost);
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
      const cost = await update(id, req.body.title, req.body.price);
      res.json(cost);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.get(
  "/:plannerId/:costId",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.costId;
      const cost = await getById(id, true);
      res.json(cost);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
