import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/taskServices";
import { toast } from "sonner";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      toast("Task Added successfully");
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: Error) => {
      toast("Task cannot Added");
      console.error("Fehler beim Erstellen:", err);
    },
  });
};
