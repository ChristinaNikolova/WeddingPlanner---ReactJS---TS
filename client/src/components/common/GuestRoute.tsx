import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { RouteProps } from "../../interfaces/props/shared/RouteProps";

const GuestRoute = ({ children }: RouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
};

export default GuestRoute;
