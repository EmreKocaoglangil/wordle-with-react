import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuth } from "@/auth-provider";
import { useMutation } from "react-query";
import request from "@/services";
import { Button, Input } from "./ui/forward";
import { useToast } from "./ui/use-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

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
	const { toast } = useToast();
	// Mutations
	const { mutate, isLoading } = useMutation(
		(payload: RegisterInput) =>
			request(import.meta.env.VITE_APP_API_URL + "/registera", {
				method: "POST",
				body: JSON.stringify(payload),
			}),
		{
			onSuccess: (result) => {
				handleAuth(result);
			},
			onError: () => {
				toast({
					title: "Kayıt Hatası",
					description: "Kayıt yaparken hata meydana geldi",
					duration: 2000,
				});
			},
		}
	);

	const form = useForm<RegisterInput>({
		resolver: zodResolver(RegisterSchema),
	});
	const onSubmit: SubmitHandler<RegisterInput> = (data: RegisterInput) => {
		mutate(data);
	};

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-2 w-[40%] mx-auto'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='Username' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' placeholder='Email' {...field} />
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
				<FormField
					control={form.control}
					name='passwordConfirm'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='confirm password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={!form.formState.isDirty || isLoading}
					type='submit'
					variant='default'
				>
					Login
				</Button>
			</form>
		</Form>
	);
}
