import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/taskServices";
import { toast } from "sonner";

export const useCreateTask = (reset: () => void) => {
  const queryClient = useQueryClient();
  const query = { queryKey: ["tasks"] };
  return useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries(query);
      toast("Task Added successfully");
      reset();
    },
    onError: (err: Error) => {
      toast("Task cannot Added");
      console.error("Fehler beim Erstellen:", err);
    },
  });
};
