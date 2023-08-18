import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import request from "@/services";
import { useAppDispatch } from "@/libs/redux/hook";
import { login } from "@/libs/redux/userSlice";
import { Button, Input } from "./ui/forward";
import { useToast } from "./ui/use-toast";

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
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  // Mutations
  const { mutate, isLoading } = useMutation(
    (payload: LoginInput) =>
      request(`${import.meta.env.VITE_APP_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (result) => {
        dispatch(login(result));
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

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });
  const onSubmit: SubmitHandler<LoginInput> = (data: LoginInput) => {
    mutate(data);
  };

  return (
    <div className="mx-auto w-[40%]">
      <header>
        <h1 className="text-center text-xl">Login</h1>
      </header>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Username</label>
        <Input
          error={!!errors.username}
          placeholder="Username"
          {...register("username")}
        />

        <label>Password</label>
        <Input
          error={!!errors.password}
          type="password"
          placeholder="password"
          {...register("password")}
        />

        <Button
          size="default"
          disabled={!isDirty}
          loading={isLoading}
          type="submit"
          className="w-full"
          label="Login"
        />
        <p>
          Henüz hesabınız yoksa{" "}
          <Link className="font-bold dark:text-green" to="/register">
            Kayıt olun
          </Link>
        </p>
      </form>
    </div>
  );
}
