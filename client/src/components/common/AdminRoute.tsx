import { Navigate, Outlet } from "react-router-dom";
import type { RouteProps } from "../../interfaces/RouteProps";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = ({ children }: RouteProps) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
};

export default AdminRoute;
