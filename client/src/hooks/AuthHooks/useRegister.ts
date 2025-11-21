import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchRegister } from "@/services/authServices";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchRegister,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/login");
      toast("Welcome 🥷 😊");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errorMessage = err.response?.data?.message || "Register Failed";
      toast(errorMessage + "📝");
    },
  });
};
