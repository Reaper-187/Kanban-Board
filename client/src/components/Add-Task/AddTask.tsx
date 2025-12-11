import { useEffect } from "react";
import { useToggle } from "@/Context/AddBtnContext";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardHeader } from "../ui/card";
import { Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar24 } from "../CalendarComp/DueDateCalendar";
import { DropdownMenuImportance } from "../DropDownMenu/DropDown";
import type { Task } from "../Types/types";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateTask } from "@/hooks/TaskHooks/useUpdateTask";
import { useCreateTask } from "@/hooks/TaskHooks/useCreateTask";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dropzone } from "../Dropzone/Dropzone";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  //MIME-Typ (Multipurpose Internet Mail Extensions)
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/xml",
];

const formTaskSchema = z.object({
  taskId: z.string().optional(),
  topic: z.string(),
  description: z.string(),
  status: z.string().optional(),
  importance: z.enum(["Urgent", "High", "Lead", "Internal", "Medium", "Low"]),
  newFiles: z
    .any()
    .optional()
    .or(z.null())
    .refine(
      (files) =>
        !files ||
        (Array.isArray(files) &&
          files.every((file) => file.size <= MAX_FILE_SIZE)),
      "Max file size is 5MB per file."
    )
    .refine(
      (files) =>
        !files ||
        (Array.isArray(files) &&
          files.every((file) => ACCEPTED_FILE_TYPES.includes(file.type))),
      "Only .pdf, .xls, .doc, .xml, .jpg, .jpeg, .png and .webp formats are supported."
    ),
  date: z.date().optional(),
});

type FormTask = z.infer<typeof formTaskSchema>;

export const AddTask = () => {
  const { isOpen, closeModal, currentTask, openAlertModal } = useToggle();
  const queryClient = useQueryClient();

  const tasks = queryClient.getQueryData<Task[]>(["tasks"]) ?? [];
  const originalTask = tasks.find((t) => t._id === currentTask?._id);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormTask>({
    resolver: zodResolver(formTaskSchema),
    defaultValues: {
      importance: "Medium",
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

  const {
    mutate: patchMutate,
    isError: patchIsError,
    error: patchError,
  } = useUpdateTask();

  const handleStatusChange = (data: FormTask) => {
    if (!currentTask?._id || !originalTask) return;

    const updates: Partial<FormTask> = {};

    const keys = Object.keys(data) as (keyof FormTask)[];
    for (const key of keys) {
      const newValue = data[key];
      const oldValue = originalTask[key as keyof Task] as unknown;

      if (key === "date") {
        const newTime = newValue ? new Date(newValue).getTime() : null;
        const oldTime = oldValue ? new Date(oldValue as Date).getTime() : null;
        if (newTime !== oldTime) {
          updates.date = newValue as Date;
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
    patchMutate({ _id: currentTask._id, updates });
    closeModal();
  };

  const {
    mutate: postMutate,
    isPending,
    isError: postIsError,
    error: postError,
  } = useCreateTask(reset);

  const handleAddTask = (data: FormTask) => {
    postMutate(data);
    closeModal();
  };

  const onSubmitHandler = currentTask?._id ? handleStatusChange : handleAddTask;

  const activeError = currentTask?._id ? patchError : postError;

  const activeIsError = currentTask?._id ? patchIsError : postIsError;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
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
                      {currentTask?._id ? "Edit" : "Create"} To-Do
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
                    <Label>Add File:</Label>
                    <Controller
                      control={control}
                      name="newFiles"
                      render={({ field }) => (
                        <Dropzone
                          value={field.value}
                          onChange={field.onChange}
                          currentTask={currentTask}
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

                  <div>
                    <div
                      className={
                        currentTask?._id
                          ? "flex-1 flex items-center justify-between"
                          : "flex-1 flex items-center justify-end"
                      }
                    >
                      <span
                        className={
                          currentTask?._id
                            ? "text-white flex items-center bg-red-500 p-1 rounded-sm cursor-pointer hover:text-black transition-all duration-300"
                            : "hidden"
                        }
                        onClick={() => {
                          if (currentTask) {
                            openAlertModal(currentTask);
                          }
                        }}
                      >
                        <Trash size={20} />
                        delete
                      </span>
                      <Button
                        className="w-fit cursor-pointer md:w-fit font-semibold"
                        type="submit"
                        disabled={isPending || !isDirty}
                      >
                        {isPending ? "Wird gespeichert..." : "Add to Board"}
                      </Button>
                    </div>
                    {activeIsError && (
                      <p>Fehler: {(activeError as Error).message}</p>
                    )}
                  </div>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
