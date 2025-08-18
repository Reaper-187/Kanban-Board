import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/components/TEST/Types/types";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  task: Task;
};

type Color = {
  Urgent: string;
  Lead: string;
  High: string;
  Medium: string;
  Low: string;
};

const importanceColor: Record<keyof Color, string> = {
  Urgent: "bg-red-600",
  Lead: "bg-orange-400",
  High: "bg-red-400",
  Medium: "bg-yellow-200",
  Low: "bg-gray-200",
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const colorPick = importanceColor[task.importance as keyof Color];

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="my-1 cursor-grab active:cursor-grabbing will-change-transform"
      style={style}
    >
      <Card
        id={task.id}
        className="p-3 my-1 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3 hover:shadow-xl"
      >
        <div className="flex justify-between items-start flex-wrap">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
            {task.topic}
          </h3>
          <span>alert-Btn</span>
        </div>
        <p className="text-sm sm:text-base">{task.description}</p>
        <div className="flex flex-wrap gap-2">
          <span
            className={
              colorPick
                ? `${colorPick} px-2 py-1 rounded-xl text-xs sm:text-sm`
                : ""
            }
          >
            {task.importance}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          <Calendar size={16} />
          <span className="font-medium">Due Date: {task.date}</span>
        </div>
      </Card>
    </div>
  );
};
