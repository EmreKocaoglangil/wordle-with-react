import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button, Input } from "./ui/forward";
import { useAuth } from "@/auth-provider";
import { useMutation } from "react-query";
import request from "@/services";
import { useToast } from "./ui/use-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

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
	const { toast } = useToast();
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
				toast({
					title: "Giriş Hatası",
					description: "Giriş yaparken hata meydana geldi",
					duration: 2000,
				});
			},
		}
	);

	const form = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });
	const onSubmit: SubmitHandler<LoginInput> = (data: LoginInput) => {
		mutate(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-2 w-[40%] mx-auto'
			>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='username' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input type='password' placeholder='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={!form.formState.isDirty || isLoading} type='submit'>
					Login
				</Button>
			</form>
		</Form>
	);
}
