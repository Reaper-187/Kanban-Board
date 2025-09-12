import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/services/taskServices";
import type { Task } from "@/components/Types/types";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ _id, updates }: { _id: string; updates: Partial<Task> }) =>
      updateTask(_id, updates),
    onMutate: async ({ _id, updates }) => {
      // 1. Query-Cancelling
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      // 2. Alte DAten Speichern für Fallback
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
      // 3. Opti-Updaten
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((task) => (task._id === _id ? { ...task, ...updates } : task))
      );
      // 4. Alte Daten falls Fehler
      return { previousTasks };
    },
    onError: (
      err: Error,
      newTodo: { _id: string; updates: Partial<Task> },
      context?: { previousTasks?: Task[] }
    ) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return mutation;
};

// Types fürs Backend erstellen und
//  für Tanstack Optimistic Update im Frontend verwednen
