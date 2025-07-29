import { createContext } from "react";
import type { AuthContextValue } from "../interfaces/AuthContextValue";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
