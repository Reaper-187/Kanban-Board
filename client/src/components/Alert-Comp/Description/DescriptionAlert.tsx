import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader } from "../../ui/card";
import { useToggle } from "@/Context/AddBtnContext";
import { DescriptionInfos } from "./Description-Info";
import { Check, Copy, X } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ActivityLog } from "./ActivityLog/ActivityLog";
import { useState } from "react";

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
            animate={{ y: 0, opacity: 11 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto"
          >
            <Card className="relative p-5">
              {/* ---------- HEADER ---------- */}
              <CardHeader className="p-0">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 justify-evenly items-center">
                    <h1 className="text-md md:text-lg font-semibold">
                      Ticket-Info
                    </h1>
                    <button
                      title="Copy Ticket-ID"
                      onClick={() =>
                        navigator.clipboard.writeText(currentTask._id)
                      }
                      className="group cursor-pointer bg-transparent border-none text-xs flex gap-2"
                    >
                      <Copy size={18} />
                      <p className="opacity-0 group-hover:opacity-100 transition-opacity">
                        Copy-Ticket-id
                      </p>
                    </button>
                  </div>
                  <span
                    onClick={closeDescription}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </span>
                </div>
              </CardHeader>

              {/* ---------- TABS ---------- */}
              <Tabs defaultValue="DescriptionInfos" className="mt-2">
                <TabsList className="mb-5 flex gap-3 text-xs md:text-sm">
                  <TabsTrigger
                    className="transition duration-300 bg-ring p-1 rounded-md cursor-pointer text-primary-foreground hover:bg-primary-foreground hover:text-secondary-foreground"
                    value="DescriptionInfos"
                  >
                    Description
                  </TabsTrigger>

                  <TabsTrigger
                    className="transition duration-300 bg-ring p-1 rounded-md cursor-pointer text-primary-foreground hover:bg-primary-foreground hover:text-secondary-foreground"
                    value="activityLogs"
                  >
                    Activity Logs
                  </TabsTrigger>
                </TabsList>

                {/* ---------- TAB: DESCRIPTION ---------- */}
                <TabsContent value="DescriptionInfos">
                  <DescriptionInfos currentTask={currentTask} />
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
