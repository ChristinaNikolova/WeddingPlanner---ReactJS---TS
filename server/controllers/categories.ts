import { Request, Response, Router } from "express";
import categories from "../services/categories";
import parser from "../utils/parser";

const router = Router();
const { all } = categories;
const { mapErrors } = parser;

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await all();
    res.json(categories);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

export default router;
