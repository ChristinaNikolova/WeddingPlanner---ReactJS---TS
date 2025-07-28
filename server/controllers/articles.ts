import { Request, Response, Router } from "express";
import { AuthRequest } from "../interfaces/AuthRequest";
import { TokenPayload } from "../interfaces/TokenPayload";
import articles from "../services/articles";
import guards from "../middlewares/guards";
import global from "../utils/constants/global";
import parser from "../utils/parser";

const router = Router();
const { all, getById, like, getLastThree, getTotalCount } = articles;
const { hasUser } = guards;
const { pagination } = global;
const { mapErrors } = parser;

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await getLastThree();
    res.json(articles);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get(
  "/:page/:category",
  async (req: Request, res: Response): Promise<void> => {
    try {
      // todo request interface
      const currentPage = Number(req.params.page);
      const selectedCategory =
        req.params.category !== "default" ? req.params.category : "";
      const searchedQuery = (req.query.query as string) || "";

      const skip = (currentPage - 1) * pagination.ARTICLES_PER_PAGE;
      const totalArticles = await getTotalCount(
        selectedCategory,
        searchedQuery
      );
      const pagesCount = Math.ceil(
        totalArticles / pagination.ARTICLES_PER_PAGE
      );

      const articles = await all(
        pagination.ARTICLES_PER_PAGE,
        skip,
        selectedCategory,
        searchedQuery
      );
      res.json({ articles, pagesCount, currentPage });
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
      const article = await getById(id, true);
      res.json(article);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.post(
  "/:id",
  hasUser(),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const userId = (req.user as TokenPayload)._id;

      const article = await like(id, userId);
      res.json(article);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
