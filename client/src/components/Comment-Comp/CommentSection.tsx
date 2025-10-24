import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useCreateComment } from "@/hooks/useCreateComment";

type TaskIdProps = {
  taskId: string;
};

export const CommentSection = ({ taskId }: TaskIdProps) => {
  const [comment, setComment] = useState({
    userId: "1234",
    userName: "Max Mustermann",
    text: "",
    timeStamp: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment((prev) => ({
      ...prev,
      text: value,
    }));
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    postComment({ comment: [comment] });
  };

  const { mutate: postComment } = useCreateComment(taskId);

  return (
    <form onSubmit={submitComment}>
      <p className="text-lg font-semibold mb-2">Activity</p>
      <Card className="h-[200px] overflow-y-auto divide-y-4 divide-gray-200">
        <div className="p-1">
          <span className="flex gap-3">
            <p>user-name</p>
            <p>Datum / Zeit</p>
          </span>
          <p>text</p>
        </div>
      </Card>
      <div className="flex w-full gap-2 mt-2">
        <Input
          placeholder="Add Your Comment"
          onChange={(e) => handleChange(e)}
          value={comment.text}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={comment.text === "" ? true : false}
        >
          <Send />
        </Button>
      </div>
    </form>
  );
};
