import { DropdownSwitchStatus } from "@/components/DropDownMenu/DropDown";
import type { Task } from "@/components/Types/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToggle } from "@/Context/AddBtnContext";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Calendar, Ellipsis, Pen } from "lucide-react";
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
    <div className="flex justify-between items-center transition duration-300 border hover:shadow-md p-2">
      <div className="flex items-center gap-3" id={task._id} key={task.status}>
        <Checkbox />
        <h3 className="text-base sm:text-md md:text-lg font-semibold">
          {task.topic}
        </h3>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          <Calendar size={16} />
          <span className="font-medium">
            Due Date{" "}
            {task.date ? new Date(task.date).toLocaleDateString("de-DE") : ""}
          </span>
        </div>

        <div className="flex gap-2">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 h-auto w-auto">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Button
              type="button"
              onClick={() => openModal(task._id)}
              className="w-full"
            >
              <Pen size={15} className="cursor-pointer" />
            </Button>
            <DropdownMenuSeparator />

            <span>
              <DropdownSwitchStatus
                value={task.status}
                onChange={(newStatus) => {
                  onStatusChange(task._id, { status: newStatus });
                  document.body.style.pointerEvents = "auto";
                }}
              />
            </span>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
