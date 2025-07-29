import { AuthContext } from "./AuthContext";
import type { AuthResponse } from "../interfaces/AuthResponse";
import type { AuthContextValue } from "../interfaces/AuthContextValue";
import type { AuthProviderProps } from "../interfaces/AuthProviderProps";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { emails } from "../utils/constants/global";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useSessionStorage<string>("authToken", "");
  const [email, setEmail] = useSessionStorage<string>("email", "");
  const [id, setId] = useSessionStorage<string>("userId", "");

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
