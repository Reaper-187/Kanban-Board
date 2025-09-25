import type { Task } from "@/components/Types/types";
import { useToggle } from "@/Context/AddBtnContext";
import { Calendar } from "lucide-react";
import React from "react";

type TaskCardProps = {
  task: Task;
  onStatusChange: (_id: string, updates: Partial<Task>) => void;
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

export const TaskCardList = ({ task, onStatusChange }: TaskCardProps) => {
  const { openModal } = useToggle();

  const colorPick = importanceColor[task.importance as keyof Color];

  return (
    <div className="flex justify-between transition duration-300 hover:shadow-md p-2">
      <div className="flex gap-5" id={task._id} key={task.status}>
        <input type="checkbox" name="" id="" />
        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
          {task.topic}
        </h3>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          <Calendar size={16} />
          <span className="font-medium">
            Due Date{" "}
            {task.date ? new Date(task.date).toLocaleDateString("de-DE") : ""}
          </span>
        </div>
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
      </div>

      <p>....</p>
    </div>
  );
};
