import { Outlet, Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  path: string;
  condition: boolean;
}

function ProtectedRoute({ path, condition }: RequireAuthProps) {
  const location = useLocation();
  return condition ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to={path} replace />
  );
}

export default ProtectedRoute;
