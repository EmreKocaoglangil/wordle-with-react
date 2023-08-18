import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainRootLayout from "@/pages/Main/MainRootLayout";
import AuthRootLayout from "@/pages/Auth/AuthRootLayout";
import Game from "@/components/Game";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
// import { useAuth } from "@/auth-provider";
import { useAppSelector } from "@/libs/redux/hook";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  // const { isAuth } = useAuth();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainRootLayout />}>
          <Route
            element={<ProtectedRoute condition={isAuth} path="register" />}
          >
            <Route index element={<Game />} />
            <Route path="*" element={<Game />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute condition={!isAuth} path="/" />}>
          <Route element={<AuthRootLayout />}>
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Route>
      </Route>
    )
  );
};

export default Router;
