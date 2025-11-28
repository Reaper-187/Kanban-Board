import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader } from "../../ui/card";
import { useToggle } from "@/Context/AddBtnContext";

import { DescriptionBody } from "./Description-Body";
import { X } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ActivityLog } from "./ActivityLog/ActivityLog";

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
              {/* ---------- HEADER ---------- */}
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

              {/* ---------- TABS ---------- */}
              <Tabs defaultValue="descriptionBody" className="mt-2">
                <TabsList className="mb-5 flex gap-3 ">
                  <TabsTrigger
                    className="p-1 cursor-pointer bg-muted text-muted-foreground w-fit rounded-md"
                    value="descriptionBody"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    className="p-1 cursor-pointer bg-muted text-muted-foreground w-fit rounded-md"
                    value="activityLogs"
                  >
                    Activity Logs
                  </TabsTrigger>
                </TabsList>

                {/* ---------- TAB: DESCRIPTION ---------- */}
                <TabsContent value="descriptionBody">
                  <DescriptionBody currentTask={currentTask} />
                </TabsContent>

                {/* ---------- TAB: ACTIVITY LOGS ---------- */}
                <TabsContent value="activityLogs">
                  <ActivityLog taskId={currentTask._id} />
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
