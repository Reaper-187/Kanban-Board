import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChangePW } from "@/hooks/AuthHooks/useChangePw";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const newPwSchema = z
  .object({
    currentPw: z.string().min(8, "Password must be at least 8 charachters"),
    newPw: z.string().min(8, "Password must be at least 8 charachters"),
    confirmPw: z.string().min(8),
  })
  .refine((data) => data.newPw === data.confirmPw, {
    message: "Passwords don't match",
    path: ["confirmPw"], // Fehler wird bei confirmPw angezeigt
  });

type NewPwForm = z.infer<typeof newPwSchema>;

export const ChangePw = () => {
  const { mutate } = useChangePW();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPwForm>({
    resolver: zodResolver(newPwSchema),
  });

  const handleNewPw = (data: NewPwForm) => {
    mutate(data);
  };

  const criteriaList = [
    "Minumum characters 8",
    "One uppercase charachter",
    "One lowercase charachter",
    "One speacial charachter",
    "One number",
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 w-1/2">
          <form className="space-y-3" onSubmit={handleSubmit(handleNewPw)}>
            <p>Old Password</p>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("currentPw")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-red-500">{errors.currentPw?.message}</p>

            <p>New Password</p>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("newPw")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-red-500">{errors.newPw?.message}</p>

            <div className="ml-5">
              {criteriaList.map((criteria) => (
                <li key={criteria}>{criteria ?? ""}</li>
              ))}
            </div>

            <p>Confirm New Password</p>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("confirmPw")} // Wichtig: registrieren!
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-red-500">{errors.confirmPw?.message}</p>
            <Button className="w-full bg-indigo-500" type="submit">
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
