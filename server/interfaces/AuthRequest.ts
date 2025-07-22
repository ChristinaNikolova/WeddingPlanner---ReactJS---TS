import { Request } from "express";

// todo add types here
export interface AuthRequest extends Request {
  user?: any;
  token?: any;
}
