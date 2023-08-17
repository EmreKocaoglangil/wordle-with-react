import { RouterProvider } from "react-router-dom";
import Router from "@/Routes/index";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={Router()} />
    </>
  );
}

export default App;
