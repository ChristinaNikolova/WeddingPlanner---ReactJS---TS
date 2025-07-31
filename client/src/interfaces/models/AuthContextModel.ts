import type { AuthModel } from "./AuthModel";

export interface AuthContextModel {
  userLogin: (authData: AuthModel) => void;
  userLogout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId: string;
}
