import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/services/taskServices";
import type { Task } from "@/components/Types/types";
import { toast } from "sonner";
import type { AxiosError } from "axios";

type DeletePayload = { _id: string[] };

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const query = { queryKey: ["tasks"] };
  const mutate = useMutation({
    mutationFn: (payload: DeletePayload) => deleteTask(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries(query);

      const previousTasks = queryClient.getQueriesData<Task[]>(query);

      queryClient.setQueriesData<Task[]>(query, (old = []) =>
        old.filter((task) => !payload._id.includes(task._id))
      );
      toast("Task successfully delted");
      return { previousTasks };
    },
    onError: (err: AxiosError<{ message: string }>, variables, context) => {
      const errorMessage = err.response?.data?.message || "Delete Task Failed";
      toast(errorMessage + "❌");
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },
    onSettled: async () => {
      return queryClient.invalidateQueries(query);
    },
  });
  return mutate;
};
