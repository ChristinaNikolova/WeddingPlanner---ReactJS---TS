import { Response, NextFunction } from "express";
import { AuthRequest } from "../interfaces/AuthRequest";
import { TokenPayload } from "../interfaces/TokenPayload";
import global from "../utils/constants/global";
import parser from "../utils/parser";

const { emails, errors } = global;
const { mapErrors } = parser;

function isAdmin() {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && (req.user as TokenPayload).email === emails.ADMIN) {
      next();
    } else {
      const message = mapErrors({ message: errors.NOT_LOGGED_IN });
      res.status(401).json({ message });
    }
  };
}

function hasUser() {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user) {
      next();
    } else {
      const message = mapErrors({ message: errors.NOT_LOGGED_IN });
      res.status(401).json({ message });
    }
  };
}

function isGuest() {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user) {
      const message = mapErrors({ message: errors.ALREADY_LOGGED_IN });
      res.status(400).json({ message });
    } else {
      next();
    }
  };
}

export default {
  isAdmin,
  hasUser,
  isGuest,
};
