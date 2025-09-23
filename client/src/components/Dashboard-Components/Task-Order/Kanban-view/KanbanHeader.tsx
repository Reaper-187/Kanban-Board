import { PlusIcon } from "lucide-react";
import type { ColumnProps } from "../StatusTypes/StatusTypes";
import { useToggle } from "@/Context/AddBtnContext";

export const KanbanHeader = ({ column, tasks }: ColumnProps) => {
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
