import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { RouteProps } from "../../interfaces/props/shared/RouteProps";

const PrivateRoute = ({ children }: RouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ?? <Outlet />;
};

export default PrivateRoute;
