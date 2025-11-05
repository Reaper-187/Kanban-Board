import { KanbanColumnMobile } from "./KanbanColumnMobile";
import { COLUMNS, type Column, type Task } from "@/components/Types/types";
import { KanbanTaskCard } from "../../Task-Card/Kanban-Card/KanbanTaskCard";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

type KanbanColumnProps = {
  column: Column;
  tasks: Task[];
  onStatusChange: (_id: string, updates: Partial<Task>) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const KanbanMobile = ({
  column,
  tasks,
  setActiveIndex,
  onStatusChange,
}: KanbanColumnProps) => {
  const activeTasks = tasks.filter((task) => task.status === column.id);

  const [direction, setDirection] = useState(1); // 1 = nach rechts, -1 = nach links

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between w-full px-4 mb-2">
        <Button
          onClick={() => {
            setDirection(-1);
            setActiveIndex((prev) =>
              prev > 0 ? prev - 1 : COLUMNS.length - 1
            );
          }}
        >
          <MoveLeft />
        </Button>

        <Button
          onClick={() => {
            setDirection(1);
            setActiveIndex((prev) =>
              prev < COLUMNS.length - 1 ? prev + 1 : 0
            );
          }}
        >
          <MoveRight />
        </Button>
      </div>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={column.id}
          custom={direction}
          variants={{
            enter: (dir) => ({
              x: dir > 0 ? "100%" : "-100%",
              opacity: 0,
            }),
            center: { x: 0, opacity: 1 },
            exit: (dir) => ({
              x: dir > 0 ? "-100%" : "100%",
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Card className="p-3">
            <KanbanColumnMobile column={column} tasks={activeTasks} />
            <div className="flex flex-col gap-2">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <KanbanTaskCard
                    key={task._id}
                    task={task}
                    onStatusChange={(_id, updates) =>
                      onStatusChange(_id, updates)
                    }
                  />
                ))
              ) : (
                <Card className="flex items-center justify-center w-[266px] h-[266px]">
                  <p>No Tasks here</p>
                </Card>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
