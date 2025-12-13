import { Card } from "@/components/ui/card";
import { Calendar, File, Grip, MessageCircleMore, Pen } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/components/Types/types";
import { useDraggable } from "@dnd-kit/core";
import { DropdownSwitchStatus } from "@/components/DropDownMenu/DropDown";
import { useToggle } from "@/Context/AddBtnContext";
import { useMediaQuery } from "@uidotdev/usehooks";
import { motion } from "framer-motion";

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

export const KanbanTaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const { openModal, openDescription } = useToggle();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const colorPick = importanceColor[task.importance as keyof Color];

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`my-1 ${isDragging ? "opacity-0" : ""}`}
      initial={{ opacity: 0, x: -30, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <Card
        id={task._id}
        key={task.status}
        className="p-3 transition duration-300 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3 hover:shadow-xl"
      >
        <div className="flex justify-between">
          <div
            {...listeners}
            {...attributes}
            className={
              isMobile
                ? "hidden"
                : "justify-center cursor-grab active:cursor-grabbing md:flex"
            }
          >
            <Grip />
          </div>
          <button
            type="button"
            onClick={() => openModal(task)}
            className="p-1 rounded-full transition duration-300 cursor-pointer hover:text-secondary-foreground"
          >
            <Pen size={15} className="cursor-pointer" />
          </button>
        </div>

        <div className="flex justify-between items-start flex-wrap">
          <div>
            <h3 className="text-xs md:text-md md:text-xl font-semibold">
              {task.topic}
            </h3>
            <p className="text-xs md:text-md">{task.description}</p>
          </div>
          <span className={isMobile ? "" : "hidden"}>
            <DropdownSwitchStatus
              value={task.status}
              onChange={(newStatus) =>
                onStatusChange(task._id, { status: newStatus })
              }
            />
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={
              colorPick
                ? `${colorPick} px-2 py-1 rounded-xl text-black font-semibold text-xs md:text-md`
                : ""
            }
          >
            {task.importance}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          <Calendar size={16} />
          <span className="font-medium text-gray-400">
            Due Date{" "}
            {task.date ? new Date(task.date).toLocaleDateString("de-DE") : ""}
          </span>
        </div>
        <span className="w-full bg-gray-400 h-[1px]"></span>
        <div
          className="flex justify-evenly cursor-pointer text-forderground hover:text-indigo-500 duration-300 transition"
          onClick={() => openDescription(task)}
        >
          <span className="flex items-center">
            <File size={15} />{" "}
            <div>
              <p className="text-sm md:text-md p-1 rounded-m bg-grey-300">
                {task?.file?.length ?? 0} file
              </p>
            </div>
          </span>
          <span className="flex items-center">
            <MessageCircleMore size={15} />
            <p className="text-sm md:text-md p-1 rounded-m bg-grey-300">
              {task?.comment.length ?? 0} comments
            </p>
          </span>
        </div>
      </Card>
    </motion.div>
  );
};
