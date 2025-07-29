import type { AuthResponse } from "./AuthResponse";

export interface AuthContextValue {
  userLogin: (authData: AuthResponse) => void;
  userLogout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId: string;
}
