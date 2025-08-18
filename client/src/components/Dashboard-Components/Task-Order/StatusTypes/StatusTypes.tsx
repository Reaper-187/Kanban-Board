import { Card } from "@/components/ui/card";
import { PlusIcon, type LucideIcon } from "lucide-react";
import { useToggle } from "@/Context/AddBtnContext";
import { TaskCard } from "../../Task-Card/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { Column as ColumnType, Task } from "@/components/TEST/Types/types";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export const StatusTypes = ({ column, tasks }: ColumnProps) => {
  const { toggleOpen } = useToggle();

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <section className="min-w-80 w-80 shrink-0 flex flex-col">
      <Card className="flex items-center justify-between px-3 py-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-red-200 p-1">
            {/* <Icon size={13} /> NOCH ANPASSEN */}
          </span>
          <h3 className="font-semibold">{column.title}</h3>
          <span className="bg-gray-200 rounded-sm px-1 text-sm">
            {column.outcome} Tasks
          </span>
        </div>
        <button
          type="button"
          onClick={toggleOpen}
          className="p-1 rounded hover:bg-gray-200"
          aria-label="Add task"
        >
          <PlusIcon size={15} />
        </button>
      </Card>
      <div
        ref={setNodeRef}
        className="rounded-lg border p-2 min-h-32 transition-colors duration-200"
      >
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard key={task.id} task={task} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
