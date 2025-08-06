import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { RouteProps } from "../../interfaces/props/shared/RouteProps";

const AdminRoute = ({ children }: RouteProps) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
};

export default AdminRoute;
