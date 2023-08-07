import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button, Input, Label } from "./ui/forward";
import { useAuth } from "@/auth-provider";
import { useMutation } from "react-query";
import request from "@/services";

const LoginSchema = z.object({
	username: z
		.string()
		.min(2, "Kullanıcı adı en az 2 karakter olabilir.")
		.max(20, "Kullanıcı adı en fazla 20 karakter olabilir."),
	password: z
		.string()
		.min(2, "Şifre en az 2 karakter olabilir.")
		.max(20, "Şifre en fazla 20 karakter olabilir."),
});

type LoginInput = z.infer<typeof LoginSchema>;

export default function LoginForm() {
	const { handleAuth } = useAuth();

	// Mutations
	const { mutate, isLoading } = useMutation(
		(payload: LoginInput) =>
			request(import.meta.env.VITE_APP_API_URL + "/login", {
				method: "POST",
				body: JSON.stringify(payload),
			}),
		{
			onSuccess: (result) => {
				handleAuth(result);
			},
			onError: () => {
				console.log("HATA");
			},
		}
	);

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });
	const onSubmit: SubmitHandler<LoginInput> = (data: LoginInput) => {
		mutate(data);
	};

	return (
		<form
			className='flex flex-col gap-2 w-[40%] mx-auto'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Label htmlFor='username'>Username</Label>
			<Input id='username' {...register("username")} />
			{errors.username ? <div>{errors.username.message}</div> : null}

			<Label htmlFor='password'>Password</Label>
			<Input id='password' {...register("password")} />
			{errors.password ? <div>{errors.password.message}</div> : null}
			<Button disabled={!isDirty || isLoading} type='submit'>
				Login
			</Button>
		</form>
	);
}
