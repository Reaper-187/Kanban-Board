import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentTask } from "@/services/taskServices";
import { toast } from "sonner";
import type { Task } from "@/components/Types/types";

export const useCreateComment = (taskId: string) => {
  const queryClient = useQueryClient();
  const query = { queryKey: ["comment", taskId] };
  return useMutation({
    mutationFn: ({ comment }: { comment: Task["comment"] }) =>
      createCommentTask(taskId, comment),
    onMutate: async ({ comment }) => {
      await queryClient.cancelQueries(query);
      const previousComments = queryClient.getQueryData<Task["comment"][]>([
        "comment",
        taskId,
      ]);
      queryClient.setQueryData<Task["comment"][]>(
        ["comment", taskId],
        (old = []) => [...old, { ...comment }]
      );

      return { previousComments };
    },
    onError: (
      err: Error,
      _variables,
      context?: { previousComments?: Task["comment"][] }
    ) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comment", taskId], context.previousComments);
        toast("comment cannot be added to the Task");
        console.error("Fehler beim Erstellen des Comments", err);
      }
    },

    onSettled: async () => {
      return queryClient.invalidateQueries(query);
    },
  });
};
