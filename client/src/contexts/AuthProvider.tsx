import { AuthContext } from "./AuthContext";
import type { AuthProviderProps } from "../interfaces/props/auth/AuthProviderProps";
import type { AuthModel } from "../interfaces/models/AuthModel";
import type { AuthContextModel } from "../interfaces/models/AuthContextModel";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { emails } from "../utils/constants/global";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useSessionStorage<string>("authToken", "");
  const [email, setEmail] = useSessionStorage<string>("email", "");
  const [id, setId] = useSessionStorage<string>("userId", "");

  const userLogin = (authData: AuthModel): void => {
    setAuthToken(authData.accessToken);
    setEmail(authData.user.email);
    setId(authData.user._id);
  };

  const userLogout = (): void => {
    setAuthToken("");
    setEmail("");
    setId("");
  };

  const contextValue: AuthContextModel = {
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
