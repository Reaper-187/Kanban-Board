import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPw, type RequestTokenResponse } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

export const useForgotPw = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPw,
    onSuccess: async (response: RequestTokenResponse) => {
      await queryClient.setQueryData(["requestToken"], {
        token: response.requestToken,
        expiresAt: response.requestTokenExp,
      });
      navigate("/multifactor-authentication-oneTimer");
      toast("You`ll get a n email with a OneTime-Code");
    },
    onError: (err: Error) => {
      toast(err.message);
    },
  });
};
