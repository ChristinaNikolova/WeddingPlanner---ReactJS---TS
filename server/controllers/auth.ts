import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import auth from "../services/auth";
import guards from "../middlewares/guards";
import global from "../utils/constants/global";
import parser from "../utils/parser";
import model from "../utils/constants/model";

const router = Router();
const { register, login, logout } = auth;
const { isGuest, hasUser } = guards;
const { errors: globalErrors } = global;
const { mapErrors } = parser;
const { user } = model;

router.post(
  "/register",
  isGuest(),
  body("email").isEmail().withMessage(globalErrors.INVALID_EMAIL),
  body("password")
    .isLength({ min: user.PASSWORD_MIN_LEN })
    .withMessage(
      globalErrors.PASSWORD(user.PASSWORD_MIN_LEN, user.PASSWORD_MAX_LEN)
    ),
  body("password")
    .isLength({ max: user.PASSWORD_MAX_LEN })
    .withMessage(
      globalErrors.PASSWORD(user.PASSWORD_MIN_LEN, user.PASSWORD_MAX_LEN)
    ),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        const errors = result.array();
        throw mapErrors(errors);
      }

      const token = await register(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
      );
      res.json(token);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.post(
  "/login",
  isGuest(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const token = await login(req.body.email, req.body.password);
      res.json(token);
    } catch (error) {
      const message = mapErrors(error);
      res.status(401).json({ message });
    }
  }
);

router.get(
  "/logout",
  hasUser(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const authHeader = req.headers["x-authorization"];
      if (!authHeader || typeof authHeader !== "string") {
        // TODO interfaces for the request
        throw new Error(globalErrors.AUTH_HEADER_MISSING);
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new Error(globalErrors.INVALOD_AUTH_FORMAT);
      }

      await logout(token);
      res.status(204).end();
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

export default router;
