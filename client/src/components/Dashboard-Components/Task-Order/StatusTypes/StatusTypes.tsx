import { Card } from "@/components/ui/card";
import { TaskCard } from "../../Task-Card/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import type { Column as ColumnType, Task } from "@/components/Types/types";
import { StatusHeder } from "./StatusHeder";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onStatusChange: (_id: string, updates: Partial<Task>) => void;
  viewType: string;
};
export const StatusTypes = ({
  viewType,
  column,
  tasks,
  onStatusChange,
}: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <section className="min-w-80 w-80 shrink-0 flex flex-col">
      <Card className="flex items-center justify-between px-3 py-3 mb-2">
        <div ref={setNodeRef} className="min-h-30 min-w-full">
          <StatusHeder viewType={viewType} column={column} tasks={tasks} />
          {/* <div className="flex flex-col gap-2 ">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={(newStatus: string) =>
                  onStatusChange(task._id, { status: newStatus })
                }
              />
            ))}
          </div> */}
        </div>
      </Card>
    </section>
  );
};
