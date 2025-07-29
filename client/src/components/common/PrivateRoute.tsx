import { Navigate, Outlet } from "react-router-dom";
import type { RouteProps } from "../../interfaces/RouteProps";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = ({ children }: RouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ?? <Outlet />;
};

export default PrivateRoute;
