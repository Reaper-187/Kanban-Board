import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/services/taskServices";
import type { Task } from "@/components/Types/types";
import { toast } from "sonner";

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
      return { previousTasks };
    },
    onError: (err, variables, context) => {
      toast("Task/s cannot delete");
      console.error(err.message);
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },
    onSettled: async () => {
      return queryClient.invalidateQueries(query);
    },
  });
  return mutate;
};
