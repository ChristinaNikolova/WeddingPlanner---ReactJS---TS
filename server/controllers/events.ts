import { Request, Response, Router } from "express";
import events from "../services/events";
import guards from "../middlewares/guards";
import parser from "../utils/parser";

const router = Router();
const { all, create, heightlight, deleteById, update, getById } = events;
const { hasUser } = guards;
const { mapErrors } = parser;

router.get(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const plannerId = req.params.id;
      const events = await all(plannerId);
      res.json(events);
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
      const event = await create(
        plannerId,
        req.body.title,
        req.body.startTime,
        req.body.endTime,
        req.body.duration
      );
      res.json(event);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.post(
  "/:plannerId/:eventId",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.eventId;
      const event = await heightlight(id);
      res.json(event);
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
      const event = await deleteById(id);
      res.json(event);
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
      const event = await update(
        id,
        req.body.title,
        req.body.startTime,
        req.body.endTime,
        req.body.duration
      );
      res.json(event);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.get(
  "/:plannerId/:eventId",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.eventId;
      const event = await getById(id, true);
      res.json(event);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
