import { ActionFunctionArgs, redirect } from "react-router-dom";

type actionType = "login" | "register";

const authAction = async (
	actionType: actionType,
	{ request }: ActionFunctionArgs
) => {
	let formData = await request.formData();
	if (actionType === "register") {
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
	//redirect("/home");
	else return "test";
};

export { authAction };
