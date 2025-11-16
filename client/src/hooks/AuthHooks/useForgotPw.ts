import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPw } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

export const useForgotPw = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPw,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/multifactor-authentication-oneTimer");
      toast("You`ll get a n email with a OneTime-Code");
    },
    onError: (err: Error) => {
      toast(err.message);
    },
  });
};
