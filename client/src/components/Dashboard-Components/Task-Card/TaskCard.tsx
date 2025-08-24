import { Card } from "@/components/ui/card";
import { Calendar, Grip, Pen } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/components/Types/types";
import { useDraggable } from "@dnd-kit/core";
import { DropdownSwitchStatus } from "@/components/DropDownMenu/DropDown";
import { useToggle } from "@/Context/AddBtnContext";

type TaskCardProps = {
  task: Task;
  onStatusChange: (id: string, newStatus: string) => void;
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

export const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const { openModal } = useToggle();

  const colorPick = importanceColor[task.importance as keyof Color];

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`my-1 ${isDragging ? "opacity-0" : ""}`}
    >
      <Card
        id={task.id}
        key={task.status}
        className="p-3  transition duration-300 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3 hover:shadow-xl"
      >
        <div className="flex justify-between">
          <div
            {...listeners}
            {...attributes}
            className="hidden justify-center cursor-grab active:cursor-grabbing md:flex"
          >
            <Grip />
          </div>
          <button
            type="button"
            onClick={() => openModal(task.id)}
            className="p-1 rounded-full transition duration-300 cursor-pointer hover:bg-gray-200"
          >
            <Pen size={15} className="cursor-pointer" />
          </button>
        </div>

        <div className="flex justify-between items-start flex-wrap">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
            {task.topic}
          </h3>
          <span className="md:hidden">
            <DropdownSwitchStatus
              value={task.status}
              onChange={(newStatus) => onStatusChange(task.id, newStatus)}
            />
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
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          <Calendar size={16} />
          <span className="font-medium">
            Due Date{" "}
            {task.date ? new Date(task.date).toLocaleDateString("de-DE") : ""}
          </span>
        </div>
      </Card>
    </div>
  );
};
