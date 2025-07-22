import { Request, Response, NextFunction } from "express";

const trimBody = () => (req: Request, res: Response, next: NextFunction) => {
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    }
  });

  next();
};

export default trimBody;
