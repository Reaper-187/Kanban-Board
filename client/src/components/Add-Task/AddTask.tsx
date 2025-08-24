import { useEffect, useState } from "react";
import { useToggle } from "@/Context/AddBtnContext";
import { motion } from "framer-motion";
import { Card, CardHeader } from "../ui/card";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar24 } from "../CalendarComp/DueDateCalendar";
import { DropdownMenuImportance } from "../DropDownMenu/DropDown";
import type { Task } from "../Types/types";
import { INITIAL_TASKS } from "../Mock/mockTasks";

export const AddTask = () => {
  const { isOpen, closeModal, currentTaskId } = useToggle();

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    if (currentTaskId) {
      const found = tasks.find((task) => task.id === currentTaskId);
      setTaskToEdit(found ?? null);
    } else {
      setTaskToEdit(null);
    }
  }, [currentTaskId, tasks]);

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto"
          >
            <Card className="relative p-5">
              <CardHeader className="mb-5 p-0">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                    {currentTaskId ? "Edit" : "Create"} To-Do
                  </h1>
                  <span
                    onClick={closeModal}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </span>
                </div>
              </CardHeader>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label>Header:</Label>
                  <Input
                    placeholder="Header"
                    defaultValue={taskToEdit?.topic ?? ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label>description</Label>
                  <Input
                    placeholder="description"
                    defaultValue={taskToEdit?.description ?? ""}
                  />
                </div>
                <div className="space-y-2">
                  <DropdownMenuImportance
                    value={taskToEdit?.importance ?? ""}
                  />
                </div>
                <div className="space-y-2">
                  <Calendar24 dateString={taskToEdit?.date} />
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-between">
                <Button
                  className="w-full cursor-pointer md:w-fit font-semibold mt-4"
                  type="submit"
                >
                  Add to Board
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
