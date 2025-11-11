import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLogin } from "@/hooks/AuthHooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormLogin = z.infer<typeof loginFormSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useLogin();

  const handleLogin = (data: FormLogin) => {
    mutate(data);
  };

  return (
    <Card className="absolute top-1/2 -translate-y-1/2 flex justify-self-center">
      <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
        <div className="space-y-3">
          <input
            className="bg-black ml-2 text-red-400"
            type="email"
            placeholder="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-300">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-3">
          <input
            className="bg-black ml-2 text-red-400"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};
