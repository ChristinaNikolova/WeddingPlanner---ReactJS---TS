import { Request, Response, NextFunction } from "express";

const cors = () => (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "HEAD, OPTIONS, GET, POST, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Authorization, access-control-allow-origin"
  );

  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight request");
    res.status(200).end();
    return;
  }

  next();
};

export default cors;
