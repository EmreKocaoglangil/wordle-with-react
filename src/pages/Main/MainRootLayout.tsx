import { Outlet } from "react-router-dom";
import { useMutation } from "react-query";
import Header from "@/components/Header.tsx";
import { Button } from "@/components/ui/forward.ts";
// import { useAuth } from "@/auth-provider.tsx";
import request from "@/services/index.ts";
import { useAppDispatch } from "@/libs/redux/hook";
import { logout } from "@/libs/redux/userSlice";

function MainRootLayout() {
  // const { handleLogout } = useAuth();
  const dispatch = useAppDispatch();
  const { mutate, isLoading } = useMutation(
    () =>
      request(`${import.meta.env.VITE_APP_API_URL}/logout`, {
        method: "GET",
      }),
    {
      onSuccess: () => {
        // handleLogout();
        dispatch(logout());
      },
      onError: () => {
        console.log("HATA");
      },
    }
  );

  return (
    <>
      <Header />
      <Outlet />
      <Button loading={isLoading} onClick={() => mutate()} label="Log Out" />
    </>
  );
}

export default MainRootLayout;
