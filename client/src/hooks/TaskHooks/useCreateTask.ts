import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/taskServices";
import { toast } from "sonner";
import type { AxiosError } from "axios";

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
    onError: (err: AxiosError<{ message: string }>) => {
      const errorMessage = err.response?.data?.message;
      toast(errorMessage + "🔒");
    },
  });
};
