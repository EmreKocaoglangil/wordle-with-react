import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuth } from "@/auth-provider";
import { useMutation } from "react-query";
import request from "@/services";
import { Button, Input, Label } from "./ui/forward";

const RegisterSchema = z
	.object({
		username: z
			.string()
			.min(2, "Kullanıcı adı en az 2 karakter olabilir.")
			.max(20, "Kullanıcı adı en fazla 20 karakter olabilir."),
		email: z.string().email(),
		password: z
			.string()
			.min(2, "Şifre en az 2 karakter olabilir.")
			.max(20, "Şifre en fazla 20 karakter olabilir."),
		passwordConfirm: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ["passwordConfirm"],
	});

type RegisterInput = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
	const { handleAuth } = useAuth();

	// Mutations
	const { mutate, isLoading } = useMutation(
		(payload: RegisterInput) =>
			request(import.meta.env.VITE_APP_API_URL + "/register", {
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
	} = useForm<RegisterInput>({ resolver: zodResolver(RegisterSchema) });
	const onSubmit: SubmitHandler<RegisterInput> = (data: RegisterInput) => {
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
			<Label htmlFor='email'>Email</Label>
			<Input id='email' {...register("email")} />
			{errors.email ? <div>{errors.email.message}</div> : null}
			<Label htmlFor='password'>Password</Label>
			<Input id='password' {...register("password")} />
			{errors.password ? <div>{errors.password.message}</div> : null}
			<Label htmlFor='passwordConfirm'>Password Confirm</Label>
			<Input id='passwordConfirm' {...register("passwordConfirm")} />
			{errors.passwordConfirm ? (
				<div>{errors.passwordConfirm.message}</div>
			) : null}
			<Button disabled={!isDirty || isLoading} type='submit' variant='default'>
				Login
			</Button>
		</form>
	);
}
