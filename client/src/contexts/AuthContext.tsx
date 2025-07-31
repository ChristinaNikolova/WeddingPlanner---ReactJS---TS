import { createContext } from "react";
import type { AuthContextModel } from "../interfaces/models/AuthContextModel";

export const AuthContext = createContext<AuthContextModel | undefined>(
  undefined
);
