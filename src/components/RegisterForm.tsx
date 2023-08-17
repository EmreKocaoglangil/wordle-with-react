import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth-provider";
import request from "@/services";
import { Button, Input } from "./ui/forward";
import { useToast } from "./ui/use-toast";

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
      request(`${import.meta.env.VITE_APP_API_URL}/register`, {
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

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<RegisterInput> = (data: RegisterInput) => {
    mutate(data);
  };

  return (
    <div className="mx-auto w-[40%] ">
      <header>
        <h1 className="text-center text-xl">Register</h1>
      </header>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          error={!!errors.username}
          placeholder="username"
          {...register("username")}
        />

        <label htmlFor="email">Email</label>
        <Input
          id="email"
          error={!!errors.email}
          placeholder="Email"
          {...register("email")}
        />

        <label htmlFor="password">Password</label>
        <Input
          id="password"
          error={!!errors.password}
          type="password"
          placeholder="password"
          {...register("password")}
        />

        <label htmlFor="passwordConfirm">Confirm Password</label>

        <Input
          id="passwordConfirm"
          error={!!errors.passwordConfirm}
          type="password"
          placeholder="confirm password"
          {...register("passwordConfirm")}
        />

        <Button
          label="Register"
          size="default"
          loading={isLoading}
          disabled={!isDirty}
          type="submit"
        />
        <p>
          Hesabınız varsa{" "}
          <Link className="font-bold dark:text-green" to="/login">
            Giriş yapın.
          </Link>
        </p>
      </form>
    </div>
  );
}
