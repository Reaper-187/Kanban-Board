import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchRegister } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

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
    onError: (err: Error) => {
      toast("Register Failed");
      console.error("Fehler beim Login", err);
    },
  });
};
