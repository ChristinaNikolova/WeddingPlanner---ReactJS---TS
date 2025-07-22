import { Request, Response, Router } from "express";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
  console.log("Register route called!");
  res.status(200).json({
    success: true,
    message: "Register endpoint works!",
  });
});

router.post("/login", (req: Request, res: Response) => {
  console.log("Login route called!");
  res.status(200).json({
    success: true,
    message: "Login endpoint works!",
  });
});

router.get("/test", (req: Request, res: Response) => {
  console.log("TEST route called!");
  res.json({ message: "Test route works!" });
});

export default router;
