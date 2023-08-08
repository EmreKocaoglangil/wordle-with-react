import { RouterProvider } from "react-router-dom";
import { router } from "@/Routes/index";
import { Toaster } from "@/components/ui/toaster";

function App() {
	return (
		<>
			<Toaster />
			<RouterProvider router={router()} />
		</>
	);
}

export default App;
