import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { verifyUserOtp, type RequestOtp } from "@/services/authServices";

export const useOtp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RequestOtp) => verifyUserOtp(data),
    onSuccess: async (response: RequestOtp) => {
      await queryClient.setQueryData(["resetToken"], {
        token: response.token,
      });
      navigate("/new-password-authentication");
      toast("Please Enter your New Password");
    },
    onError: (err: Error) => {
      console.error("Fehler Fehler");
      toast(err.message);
    },
  });
};
