import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader } from "../ui/card";
import { useToggle } from "@/Context/AddBtnContext";
import { DownloadIcon, X } from "lucide-react";
import { CommentSection } from "../Comment-Comp/CommentSection";

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
              <CardHeader className="p-0">
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
                  <p className="text-secondary-foreground flex self-center">
                    {currentTask.description}
                  </p>
                </div>
                <p className="w-full bg-gray-300 h-[1px]"></p>
                <div>
                  <div className="grid grid-col-2 mb-5">
                    <div>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold">Attachment</p>
                        <p className="p-2 rounded-m bg-grey-300">
                          {currentTask.file?.length
                            ? currentTask.file?.length + " "
                            : 0}
                          file
                        </p>
                      </div>
                      <div>
                        {currentTask?.file &&
                          currentTask?.file.map((f) => (
                            <li
                              key={f.name}
                              className="flex items-center justify-between text-sm bg-secondary text-secondary-foreground p-2 my-1 rounded-md space-x-2"
                            >
                              <p className="truncate">{f.name}</p>
                              <a
                                key={f.path}
                                target="_blank"
                                href={import.meta.env.VITE_API_STATIC + f.path}
                              >
                                <DownloadIcon
                                  className={
                                    "scale-90 hover:scale-110 transition druation-300"
                                  }
                                />
                              </a>
                            </li>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <CommentSection taskId={currentTask._id} />
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
