import { Response, NextFunction } from "express";
import { AuthRequest } from "../interfaces/AuthRequest";
import global from "../utils/constants/global";
import parser from "../utils/parser";

const { emails, errors } = global;
const { mapErrors } = parser;

// TODO mapErrors in all functions
function isAdmin() {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.email === emails.ADMIN) {
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
      res.status(401).json({ message: errors.NOT_LOGGED_IN });
    }
  };
}

function isGuest() {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user) {
      res.status(400).json({ message: errors.ALREADY_LOGGED_IN });
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
