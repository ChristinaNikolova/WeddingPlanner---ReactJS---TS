import { Response, Router } from "express";
import { AuthRequest } from "../interfaces/AuthRequest";
import users from "../services/users";
import guards from "../middlewares/guards";
import parser from "../utils/parser";

const { getFavArticles } = users;
const { hasUser } = guards;
const { mapErrors } = parser;

const router = Router();

router.get(
  "/articles",
  hasUser(),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user._id;
      const articles = await getFavArticles(userId);
      res.json(articles);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
