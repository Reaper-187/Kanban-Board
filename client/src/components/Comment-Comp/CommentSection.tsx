import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useCreateComment } from "@/hooks/useCreateComment";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentTask } from "@/services/taskServices";

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
  };

  const { mutate: postComment } = useCreateComment(taskId);

  const { data: fetchTaskComments = [] } = useQuery({
    queryFn: async () => {
      const data = await fetchCommentTask(taskId);
      return data;
    },
    queryKey: ["comment", taskId],
  });
  const date = fetchTaskComments.map((comment) => comment.timeStamp);
  console.log(date);

  return (
    <form onSubmit={submitComment}>
      <p className="text-lg font-semibold mb-2">Activity</p>
      <Card className="h-[200px] overflow-y-auto divide-y-4 divide-gray-200">
        {fetchTaskComments.map((comment) => (
          <div className="p-1" key={comment._id}>
            <span className="flex gap-3">
              <p>{comment.userName}</p>

              {/* <p>{comment.timeStamp.toLocaleString()}</p> */}
            </span>
            <p>{comment.text}</p>
          </div>
        ))}
      </Card>
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
