import { Request } from "express";
import { TokenPayload } from "./TokenPayload";

export interface AuthRequest extends Request {
  user?: TokenPayload | string;
  token?: TokenPayload | string;
}
