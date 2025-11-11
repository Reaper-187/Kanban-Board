import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchLogout } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  let navigate = useNavigate();

  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: async () => {
      navigate("/login");
      toast("See you soon");
    },
    onError: (err: Error) => {
      toast("Logout Failed");
      console.error("Fehler beim Login", err);
    },
  });
};
