import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/taskServices";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: async (data) => {
      console.log("Task erfolgreich erstellt:", data);
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: Error) => {
      console.error("Fehler beim Erstellen:", err);
    },
  });
};
