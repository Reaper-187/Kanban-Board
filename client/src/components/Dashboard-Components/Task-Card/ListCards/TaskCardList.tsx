import { DropdownSwitchStatus } from "@/components/DropDownMenu/DropDown";
import type { Task } from "@/components/Types/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToggle } from "@/Context/AddBtnContext";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Ellipsis, NotepadText, Pen, X } from "lucide-react";
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
  const { openModal, isDescriptionOpen, openDescription, closeDescription } =
    useToggle();

  const colorPick = importanceColor[task.importance as keyof Color];

  return (
    <div className="flex justify-between items-center transition duration-300 border rounded-md hover:shadow-md p-2">
      <AnimatePresence>
        {isDescriptionOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/15 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-2xl mx-auto"
            >
              <Card className="relative p-5">
                <CardHeader className="mb-4 p-0">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Description</h1>
                    <span
                      onClick={closeDescription}
                      className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X size={24} />
                    </span>
                  </div>
                </CardHeader>
                <p className="felx self-center text-gray-00">
                  {task.description}
                </p>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-3" id={task._id} key={task.status}>
        <Checkbox />
        <h3 className="text-base sm:text-md md:text-lg font-medium">
          {task.topic}
        </h3>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
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
              onClick={() => openDescription(task._id)}
              className="w-full"
            >
              <NotepadText size={15} className="cursor-pointer" />
            </Button>
            <DropdownMenuSeparator />
            <DropdownSwitchStatus
              value={task.status}
              onChange={(newStatus) => {
                onStatusChange(task._id, { status: newStatus });
                document.body.style.pointerEvents = "auto";
              }}
            />
            <DropdownMenuSeparator />
            <Button
              type="button"
              onClick={() => openModal(task._id)}
              className="w-full"
            >
              <Pen size={15} className="cursor-pointer" />
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
