import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import articles from "../../services/articles";
import guards from "../../middlewares/guards";
import global from "../../utils/constants/global";
import parser from "../../utils/parser";

const router = Router();
const { create, update, deleteById } = articles;
const { isAdmin } = guards;
const { errors, category } = global;
const { mapErrors } = parser;

router.post(
  "/",
  isAdmin(),
  body("image").isURL().withMessage(errors.INVALID_URL),
  body("jumboImage").isURL().withMessage(errors.INVALID_URL),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        const errors = result.array();
        throw mapErrors(errors);
      }

      if (req.body.category === category.DEFAULT_CATEGORY_SELECTED_ID) {
        throw new Error(errors.SELECT_CATEGORY);
      }

      const article = await create(
        req.body.title,
        req.body.content,
        req.body.image,
        req.body.jumboImage,
        req.body.category
      );
      res.json(article);
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
  body("jumboImage").isURL().withMessage(errors.INVALID_URL),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        const errors = result.array();
        throw mapErrors(errors);
      }

      const id = req.params.id;
      const article = await update(
        id,
        req.body.title,
        req.body.content,
        req.body.image,
        req.body.jumboImage,
        req.body.category
      );
      res.json(article);
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
      const article = await deleteById(id);
      res.json(article);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
