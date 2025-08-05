import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { global } from "../utils/constants/errors";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(global.AUTH);
  }
  return context;
};
