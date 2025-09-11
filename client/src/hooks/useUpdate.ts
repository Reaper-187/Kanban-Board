import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/services/taskServices";
import type { Task } from "@/components/Types/types";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ _id, updates }: { _id: string; updates: Partial<Task> }) =>
      updateTask(_id, updates),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: Error) => {
      console.error("Task update failed", err);
    },
  });

  return mutation;
};
