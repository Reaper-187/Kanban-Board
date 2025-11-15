import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchLogout } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  let navigate = useNavigate();

  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/login");
    },
    onError: (err: Error) => {
      toast("Logout Failed");
      console.error("Fehler beim Login", err);
    },
  });
};
