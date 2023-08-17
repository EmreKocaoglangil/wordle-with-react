import { ActionFunctionArgs, redirect } from "react-router-dom";

type actionType = "login" | "register";

const authAction = async (
  action: actionType,
  { request }: ActionFunctionArgs
) => {
  const formData = await request.formData();
  if (action === "register") {
    const res = await fetch("http://localhost:5174/register", {
      headers: {
        ContentType: "multipart/form-data",
      },
      method: "POST",
      body: formData,
    });
    redirect("/");
    return res;
  }
  // redirect("/home");
  return "test";
};

export { authAction };
