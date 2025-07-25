import { Request, Response, Router } from "express";
import global from "../utils/constants/global";

const router = Router();
const { messages } = global;

router.get("/", (req: Request, res: Response): void => {
  res.json({ message: messages.REST_OPERATED });
});

export default router;
