import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader } from "../ui/card";
import { useToggle } from "@/Context/AddBtnContext";
import { DownloadIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Dropzone } from "../Dropzone/Dropzone";

export const DescriptionAlert = () => {
  const { isDescriptionOpen, closeDescription, currentTask } = useToggle();

  return (
    <AnimatePresence>
      {isDescriptionOpen && currentTask && (
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
                  <h1 className="text-xl font-semibold">Ticket-Info</h1>
                  <span
                    onClick={closeDescription}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </span>
                </div>
              </CardHeader>
              <div className="space-y-5">
                <div>
                  <p className="text-lg font-semibold">Description:</p>
                  <p className="text-gray-700 flex self-center">
                    {currentTask.description}
                  </p>
                </div>
                <p className="w-full bg-gray-300 h-[1px]"></p>
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold">Attachment</p>
                        <p className="p-2 rounded-m bg-grey-300">1: file</p>
                      </div>
                      <Dropzone />
                    </div>
                    <Button className="p-1">+ Add new File</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>DOC</p>
                    <DownloadIcon />
                  </div>
                  <div className="mt-5">
                    <p className="text-lg font-semibold">Activity</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
