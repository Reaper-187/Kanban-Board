import React, { useState } from "react";

import { Send } from "lucide-react";
import { useCreateComment } from "@/hooks/TaskHooks/useCreateComment";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentTask } from "@/services/taskServices";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TaskIdProps = {
  taskId: string;
};

export const CommentSection = ({ taskId }: TaskIdProps) => {
  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    postComment({ text: comment });
    setComment("");
  };

  const { mutate: postComment } = useCreateComment(taskId);

  const { data: fetchTaskComments = [] } = useQuery({
    queryFn: async () => {
      const data = await fetchCommentTask(taskId);
      // Neueste zuerst
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
      );
      return sortedData;
    },
    queryKey: ["comment", taskId],
  });

  return (
    <form onSubmit={submitComment}>
      <p className="text-lg font-semibold mb-2">Activity</p>

      <div className="h-[300px] rounded-lg overflow-y-auto divide-y-2 divide-gray-300 odd:bg-gray-100">
        {fetchTaskComments.map((comment) => (
          <div
            className="space-y-2 p-1 bg-secondary text-secondary-foreground odd:bg-gray-100 odd:text-primary-foreground odd:bg-primary p-3 text-xs"
            key={comment._id}
          >
            <span className="flex gap-5">
              <p className="font-semibold">User: {comment.userName}</p>

              <p>
                Date:
                {" " +
                  new Date(comment.timeStamp).toLocaleString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </p>
            </span>
            <p className="text-base">{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="flex w-full gap-2 mt-2">
        <Input
          placeholder="Add Your Comment"
          onChange={(e) => handleChange(e)}
          value={comment}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={comment === "" ? true : false}
        >
          <Send />
        </Button>
      </div>
    </form>
  );
};
