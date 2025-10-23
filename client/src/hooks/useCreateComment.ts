import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentTask } from "@/services/taskServices";
import { toast } from "sonner";

export const useCreateComment = (taskId: string) => {
  const queryClient = useQueryClient();
  const query = { queryKey: ["comment", taskId] };
  return useMutation({
    mutationFn: ({ commentText }: { commentText: string }) =>
      createCommentTask(taskId, commentText),
    onSuccess: async () => {
      await queryClient.invalidateQueries(query);
      toast("comment is added");
    },
    onError: (err: Error) => {
      toast("comment cannot be added to the Task");
      console.error("Fehler beim erstellen des Comments", err);
    },
  });
};
