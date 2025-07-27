import { Request } from "express";

// todo add types here
// todo inher.
export interface AuthRequest extends Request {
  user?: any;
  token?: any;
}
