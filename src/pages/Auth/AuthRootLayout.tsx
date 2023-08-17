import { Outlet } from "react-router-dom";
import ModeToggle from "@/components/mode-toggle";

function AuthRootLayout() {
  return (
    <>
      <ModeToggle />
      <Outlet />
    </>
  );
}

export default AuthRootLayout;
