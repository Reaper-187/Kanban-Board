import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/services/taskServices";
import type { Task } from "@/components/Types/types";
import { toast } from "sonner";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const query = { queryKey: ["tasks"] };
  const mutate = useMutation({
    mutationFn: ({ _id }: { _id: string }) => deleteTask(_id),
    onMutate: async ({ _id }) => {
      await queryClient.cancelQueries(query);

      const previousTasks = queryClient.getQueriesData<Task[]>(query);

      queryClient.setQueriesData<Task[]>(query, (old = []) =>
        old.filter((task) => task._id !== _id)
      );
      return { previousTasks };
    },
    onError: (err, variables, context) => {
      toast(err.message);
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },
    onSettled: async () => {
      return queryClient.invalidateQueries(query);
    },
  });
  return mutate;
};
