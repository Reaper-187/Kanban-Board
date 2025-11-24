import { userChangePw, type UserChangePwProps } from "@/services/authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useChangePW = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserChangePwProps) => userChangePw(data),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ["auth"] });
      toast("password changed successfully 😊🔒✌️");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const errorMessage = err.response?.data?.message;
      toast(errorMessage + "❌☝️");
    },
  });
};
