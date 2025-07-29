import { createContext, type ReactNode } from "react";
import type { AuthResponse } from "../interfaces/AuthResponse";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { emails } from "../utils/constants/global";

// todo check the interface AuthResponse
// todo create separate files for interfaces
interface AuthContextValue {
  userLogin: (authData: AuthResponse) => void;
  userLogout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useSessionStorage("authToken", "");
  const [email, setEmail] = useSessionStorage("email", "");
  const [id, setId] = useSessionStorage("userId", "");

  const userLogin = (authData: AuthResponse): void => {
    setAuthToken(authData.accessToken);
    setEmail(authData.user.email);
    setId(authData.user._id);
  };

  const userLogout = (): void => {
    setAuthToken("");
    setEmail("");
    setId("");
  };

  const contextValue: AuthContextValue = {
    userLogin,
    userLogout,
    isAuthenticated: !!authToken,
    isAdmin: email === emails.ADMIN,
    userId: id,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
