import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchLogin } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });

      navigate("/tasks");
      toast("Welcome back");
    },
    onError: (err: Error) => {
      toast("Login Failed");
      console.error("Fehler beim Login", err);
    },
  });
};
