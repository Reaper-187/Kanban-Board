import { resetUserPw, type RequestResetUserPw } from "@/services/authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useNewPw = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RequestResetUserPw) => resetUserPw(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["resetToken"] });
      navigate("/login");
      toast("Password Changed successfully");
    },
    onError: (err: Error) => {
      toast(err.message);
    },
  });
};
