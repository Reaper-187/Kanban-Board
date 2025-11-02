import type { Column, Task } from "@/components/Types/types";
import { useToggle } from "@/Context/AddBtnContext";
import { PlusIcon } from "lucide-react";

type KanbanHeaderColumnProps = {
  column: Column;
  tasks: Task[];
};

export const KanbanColumnMobile = ({
  column,
  tasks,
}: KanbanHeaderColumnProps) => {
  const { openModal } = useToggle();
  if (!column) return null;

  return (
    <div className="flex justify-around items-center gap-2 ">
      <span className={`rounded-full ${column?.color} p-1`}>
        <column.Icon size={13} />
      </span>
      <h3 className="font-semibold">{column?.title}</h3>
      <span className="bg-primary text-primary-foreground rounded-sm px-1 text-sm font-semibold">
        {tasks?.length} Tasks
      </span>
      <button
        type="button"
        onClick={() => openModal()}
        className="p-1 rounded-full transition duration-300 cursor-pointer text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
        aria-label="Add task"
      >
        <PlusIcon size={15} />
      </button>
    </div>
  );
};
