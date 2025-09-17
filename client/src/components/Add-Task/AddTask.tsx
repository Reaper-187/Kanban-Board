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
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useCreateTask } from "@/hooks/useCreateTask";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const formTaskSchema = z.object({
  _id: z.string().optional(),
  topic: z.string(),
  description: z.string(),
  importance: z.enum(["Urgent", "High", "Lead", "Internal", "Medium", "Low"]),
  date: z.date().optional(),
});

type FormTask = z.infer<typeof formTaskSchema>;

export const AddTask = () => {
  const { isOpen, closeModal, currentTaskId } = useToggle();
  const queryClient = useQueryClient();

  const tasks = queryClient.getQueryData<Task[]>(["tasks"]) ?? [];
  const originalTask = tasks.find((t) => t._id === currentTaskId);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTask>({
    resolver: zodResolver(formTaskSchema),
    defaultValues: {
      _id: "",
      topic: "",
      description: "",
      importance: "Medium",
      date: new Date(),
    },
  });

  useEffect(() => {
    if (originalTask) {
      reset({
        ...originalTask,
        date: originalTask.date ? new Date(originalTask.date) : undefined,
      });
    }
  }, [originalTask, reset]);

  const { mutate: patchMutate } = useUpdateTask();

  const handleStatusChange = (data: FormTask) => {
    if (!currentTaskId || !originalTask) return;

    const updates: Partial<FormTask> = {};

    const keys = Object.keys(data) as (keyof FormTask)[];
    for (const key of keys) {
      const newValue = data[key];
      const oldValue = originalTask[key as keyof Task] as unknown;

      if (key === "date") {
        const newTime = newValue ? new Date(newValue as Date).getTime() : null;
        const oldTime = oldValue ? new Date(oldValue as Date).getTime() : null;
        if (newTime !== oldTime) {
          updates.date = newValue as Date | undefined;
        }
        continue;
      }

      if (newValue !== (oldValue as any)) {
        updates[key] = newValue as any;
      }
    }

    if (Object.keys(updates).length === 0) {
      toast("You did no Changes");
      return;
    }

    patchMutate({ _id: currentTaskId, updates });
    closeModal();
  };

  const { mutate: postMutate, isPending, isError, error } = useCreateTask();

  const handleAddTask = (data: FormTask) => {
    postMutate(data);
  };
  const onSubmitHandler = currentTaskId ? handleStatusChange : handleAddTask;

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
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                <div className="space-y-2">
                  <Label>Topic:</Label>
                  <Input {...register("topic")} placeholder="Topic" />
                  {errors.topic && <p>{errors.topic.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>description</Label>
                  <Input
                    {...register("description")}
                    placeholder="description"
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
