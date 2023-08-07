import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Navigate,
} from "react-router-dom";
import MainRootLayout from "@/pages/Main/MainRootLayout";
import AuthRootLayout from "@/pages/Auth/AuthRootLayout";
import RequireAuth from "./RequireAuth";
import Game from "@/components/Game";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useAuth } from "@/auth-provider";

export const router = () => {
	const { isAuth } = useAuth();

	return createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path='/' element={<MainRootLayout />}>
					<Route element={<RequireAuth />}>
						<Route index element={<Game />} />
						<Route path='*' element={<Game />} />
					</Route>
				</Route>
				<Route element={<AuthRootLayout />}>
					<Route
						path='register'
						element={!isAuth ? <RegisterForm /> : <Navigate to='/' replace />}
					/>
					<Route
						path='login'
						element={!isAuth ? <LoginForm /> : <Navigate to='/' replace />}
					/>
				</Route>
			</Route>
		)
	);
};
