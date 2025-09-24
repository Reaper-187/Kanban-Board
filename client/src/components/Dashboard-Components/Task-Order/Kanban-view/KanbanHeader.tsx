import { PlusIcon } from "lucide-react";
import { useToggle } from "@/Context/AddBtnContext";
import type { Column as ColumnType, Task } from "@/components/Types/types";

export type KanbanHeaderProps = {
  column: ColumnType;
  tasks: Task[];
};

export const KanbanHeader = ({ column, tasks }: KanbanHeaderProps) => {
  const { openModal } = useToggle();

  return (
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
  );
};
