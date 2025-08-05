import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // todo error contant
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
