import { Response, NextFunction } from "express";
import authService from "../services/auth";
import global from "../utils/constants/global";
import { AuthRequest } from "../interfaces/auth/AuthRequest";

const { errors } = global;
const { parseToken } = authService;

const session =
  () => async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["x-authorization"];
    const token =
      authHeader && typeof authHeader === "string"
        ? authHeader.split(" ")[1]
        : undefined;

    if (token) {
      try {
        const payload = await parseToken(token);
        req.user = payload;
        req.token = token;
      } catch (err) {
        return res.status(401).json({ message: errors.TOKEN_INVALID });
      }
    }

    next();
  };

export default session;
