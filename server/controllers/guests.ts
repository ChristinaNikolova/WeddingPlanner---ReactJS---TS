import { Request, Response, Router } from "express";
import guests from "../services/guests";
import guards from "../middlewares/guards";
import parser from "../utils/parser";

const router = Router();
const { all, create, update, deleteById, getById } = guests;
const { hasUser } = guards;
const { mapErrors } = parser;

router.get(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const plannerId = req.params.id;
      const guests = await all(plannerId);
      res.json(guests);
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
      const guest = await create(
        req.body.firstName,
        req.body.lastName,
        req.body.gender,
        req.body.age,
        req.body.side,
        req.body.role,
        req.body.table,
        req.body.mainDish,
        req.body.confirmed,
        plannerId
      );
      res.json(guest);
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
      const guest = await deleteById(id);
      res.json(guest);
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
      const guest = await update(
        id,
        req.body.firstName,
        req.body.lastName,
        req.body.gender,
        req.body.age,
        req.body.side,
        req.body.role,
        req.body.table,
        req.body.mainDish,
        req.body.confirmed
      );
      res.json(guest);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.get(
  "/:plannerId/:guestId",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.guestId;
      const guest = await getById(id, true);
      res.json(guest);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
