import { useState } from "react";
import { AlertCircleIcon, Trash, Undo } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useToggle } from "@/Context/AddBtnContext";
import { useDeleteTask } from "@/hooks/useDelete";

interface DeleteReq {
  _id: string;
}

export function DeleteAlert() {
  const { mutate } = useDeleteTask();
  const { isAlertOpen, closeAlertModal, currentTaskId } = useToggle();

  const deleteTask = (currentTaskId: DeleteReq) => {
    console.log(currentTaskId);

    mutate(currentTaskId);
  };

  return (
    <>
      {isAlertOpen && (
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
            <Card className="grid w-full max-w-xl items-start p-2">
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Unable to process this Task.</AlertTitle>

                <AlertDescription>
                  <ul className="list-inside list-disc text-sm">
                    <li>Check the Task</li>
                    <li>Check if its Done</li>
                    <li>Discusse with the Team if its nesseccery</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="flex justify-between items-center">
                <span
                  className="text-white flex items-center bg-red-500 p-1 rounded-sm cursor-pointer hover:text-black transition-all duration-300"
                  onClick={() => deleteTask}
                >
                  <Trash size={20} />
                  delete
                </span>
                <Button onClick={closeAlertModal}>
                  <Undo></Undo>
                  Cancle
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
