import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth-provider";

function RequireAuth() {
	const { isAuth } = useAuth();
	const location = useLocation();
	return isAuth ? (
		<Outlet />
	) : (
		<Navigate state={{ from: location }} to='register' replace />
	);
}

export default RequireAuth;
