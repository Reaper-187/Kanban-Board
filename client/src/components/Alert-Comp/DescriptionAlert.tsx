import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader } from "../ui/card";
import { useToggle } from "@/Context/AddBtnContext";
import { X } from "lucide-react";

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
                  <h1 className="text-xl font-semibold">Description</h1>
                  <span
                    onClick={closeDescription}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </span>
                </div>
              </CardHeader>
              <p className="text-gray-700 flex self-center">
                {currentTask.description}
              </p>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
