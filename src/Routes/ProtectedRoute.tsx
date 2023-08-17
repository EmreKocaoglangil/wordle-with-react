import { Outlet, Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  path: string;
  isAuth: boolean;
}

function ProtectedRoute({ path, isAuth }: RequireAuthProps) {
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to={path} replace />
  );
}

export default ProtectedRoute;
