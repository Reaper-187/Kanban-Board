import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentTask } from "@/services/taskServices";
import { toast } from "sonner";
import type { Task } from "@/components/Types/types";
import type { AxiosError } from "axios";

export const useCreateComment = (taskId: string) => {
  const queryClient = useQueryClient();
  const query = { queryKey: ["comment", taskId] };

  return useMutation<
    Task,
    AxiosError<{ message: string }>,
    { text: string },
    { previousComments?: Task["comment"] }
  >({
    mutationFn: (comment) => createCommentTask(taskId, comment),

    onMutate: async (comment) => {
      await queryClient.cancelQueries(query);

      const previousComments = queryClient.getQueryData<Task["comment"]>([
        "comment",
        taskId,
      ]);

      queryClient.setQueryData<Task["comment"]>(
        ["comment", taskId],
        (old = []) => [...old, { text: comment.text }]
      );

      return { previousComments };
    },

    onError: (err: AxiosError<{ message: string }>, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comment", taskId], context.previousComments);
        const errorMessage = err.response?.data?.message;
        toast(errorMessage + "🔒");
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(query);
    },
  });
};
