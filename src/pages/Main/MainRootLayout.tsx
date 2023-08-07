import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/forward";
import { useAuth } from "@/auth-provider";
import { useMutation } from "react-query";
import request from "@/services";

const MainRootLayout = () => {
	const { handleLogout } = useAuth();
	const { mutate, isLoading } = useMutation(
		() =>
			request(import.meta.env.VITE_APP_API_URL + "/logout", {
				method: "GET",
			}),
		{
			onSuccess: () => {
				handleLogout();
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
			<Button onClick={() => mutate()} disabled={isLoading}>
				Log Out
			</Button>
		</>
	);
};

export default MainRootLayout;
