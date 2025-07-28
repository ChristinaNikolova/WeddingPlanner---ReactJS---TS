import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import categories from "../../services/categories";
import guards from "../../middlewares/guards";
import global from "../../utils/constants/global";
import parser from "../../utils/parser";

const router = Router();
const { create, update, deleteById, getById } = categories;
const { isAdmin } = guards;
const { errors, category } = global;
const { mapErrors } = parser;

router.post(
  "/",
  isAdmin(),
  body("image").isURL().withMessage(errors.INVALID_URL),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        const errors = result.array();
        throw mapErrors(errors);
      }

      const category = await create(req.body.name, req.body.image);
      res.json(category);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.put(
  "/:id",
  isAdmin(),
  body("image").isURL().withMessage(errors.INVALID_URL),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        const errors = result.array();
        throw mapErrors(errors);
      }

      const id = req.params.id;
      const category = await update(id, req.body.name, req.body.image);
      res.json(category);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.delete(
  "/:id",
  isAdmin(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      if (id === category.DEFAULT_CATEGORY_SELECTED_ID) {
        return;
      }

      await deleteById(id);
      res.status(204).end();
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.get(
  "/:id",
  isAdmin(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const category = await getById(id);
      res.json(category);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
