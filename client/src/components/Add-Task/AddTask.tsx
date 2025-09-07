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
import { createTask } from "@/services/taskServices";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const formTaskSchema = z.object({
  topic: z.string(),
  description: z.string(),
  importance: z.string(),
  date: z.date().optional(),
});

type FormTask = z.infer<typeof formTaskSchema>;

export const AddTask = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTask>({
    resolver: zodResolver(formTaskSchema),
    defaultValues: {
      topic: "",
      description: "",
      importance: "",
      date: new Date(),
    },
  });

  const { isOpen, closeModal, currentTaskId } = useToggle();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  //   if (currentTaskId) {
  //     const found = tasks.find((task) => task.id === currentTaskId);
  //     setTaskToEdit(found ?? null);
  //   } else {
  //     setTaskToEdit(null);
  //   }
  // }, [currentTaskId, tasks]);

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createTask,
    onSuccess: async (data) => {
      console.log("Task erfolgreich erstellt:", data);
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: Error) => {
      console.error("Fehler beim Erstellen:", err);
    },
  });

  const handleAddTask = (data: FormTask) => {
    mutate(data);
  };

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

              <form
                className="flex-1 space-y-4"
                onSubmit={handleSubmit(handleAddTask)}
              >
                <div className="space-y-2">
                  <Label>Topic:</Label>
                  <Input
                    {...register("topic")}
                    placeholder="Topic"
                    defaultValue={taskToEdit?.topic ?? ""}
                  />
                  {errors.topic && <p>{errors.topic.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>description</Label>
                  <Input
                    {...register("description")}
                    placeholder="description"
                    defaultValue={taskToEdit?.description ?? ""}
                  />
                  {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div className="space-y-2">
                  <Controller
                    control={control}
                    name="importance"
                    render={({ field }) => (
                      <DropdownMenuImportance
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <Calendar24
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className="flex-1 flex flex-col items-center justify-between">
                  <Button
                    className="w-full cursor-pointer md:w-fit font-semibold mt-4"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? "Wird gespeichert..." : "Add to Board"}
                  </Button>
                  {isError && <p>Fehler: {(error as Error).message}</p>}
                </div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
