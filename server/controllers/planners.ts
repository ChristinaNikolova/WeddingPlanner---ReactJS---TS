import { Request, Response, Router } from "express";
import { AuthRequest } from "../interfaces/AuthRequest";
import { TokenPayload } from "../interfaces/TokenPayload";
import planners from "../services/planners";
import guards from "../middlewares/guards";
import parser from "../utils/parser";

const router = Router();
const { create, update, deleteById, getById, allByUserId } = planners;
const { hasUser } = guards;
const { mapErrors } = parser;

router.get(
  "/",
  hasUser(),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = (req.user as TokenPayload)._id;
      const planners = await allByUserId(userId);
      res.json(planners);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.post(
  "/",
  hasUser(),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = (req.user as TokenPayload)._id;
      const planner = await create(
        req.body.description,
        req.body.date,
        req.body.budget,
        req.body.location,
        req.body.bride,
        req.body.groom,
        userId
      );
      res.json(planner);
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
      const planner = await getById(id, true);
      res.json(planner);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.delete("/:id", hasUser(), async (req, res): Promise<void> => {
  try {
    const id = req.params.id;
    const planner = await deleteById(id);
    res.json(planner);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put(
  "/:id",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const planner = await update(
        id,
        req.body.description,
        req.body.date,
        req.body.budget,
        req.body.location,
        req.body.bride,
        req.body.brideId,
        req.body.groom,
        req.body.groomId
      );
      res.json(planner);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
