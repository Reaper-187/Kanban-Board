import { Card } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { useToggle } from "@/Context/AddBtnContext";
import { TaskCard } from "../../Task-Card/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import type { Column as ColumnType, Task } from "@/components/Types/types";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onStatusChange: (_id: string, updates: Partial<Task>) => void;
};
export const StatusTypes = ({ column, tasks, onStatusChange }: ColumnProps) => {
  const { openModal } = useToggle();

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <section className="min-w-80 w-80 shrink-0 flex flex-col">
      <Card className="flex items-center justify-between px-3 py-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-red-200 p-1">
            <column.Icon size={13} />
          </span>
          <h3 className="font-semibold">{column.title}</h3>
          <span className="bg-gray-200 rounded-sm px-1 text-sm">
            {tasks.length} Tasks
          </span>
          <button
            type="button"
            onClick={() => openModal(null)}
            className="p-1 rounded-full transition duration-300 cursor-pointer hover:bg-gray-200"
            aria-label="Add task"
          >
            <PlusIcon size={15} />
          </button>
        </div>
        <div ref={setNodeRef} className="min-h-30 min-w-full">
          <div className="flex flex-col gap-2 ">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={(newStatus: string) =>
                  onStatusChange(task._id, { status: newStatus })
                }
              />
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
};
