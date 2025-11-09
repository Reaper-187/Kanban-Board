import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchLogin } from "@/services/authServices";

export const useLogin = () => {
  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: async () => {
      toast("Welcome back");
    },
    onError: (err: Error) => {
      toast("Login Failed");
      console.error("Fehler beim Login", err);
    },
  });
};
