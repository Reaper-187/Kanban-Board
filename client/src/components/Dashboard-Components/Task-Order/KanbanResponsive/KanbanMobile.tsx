import { KanbanColumnMobile } from "./KanbanColumnMobile";
import { COLUMNS, type Column, type Task } from "@/components/Types/types";
import { KanbanTaskCard } from "../../Task-Card/Kanban-Card/KanbanTaskCard";

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
  activeIndex,
  setActiveIndex,
  onStatusChange,
}: KanbanColumnProps) => {
  const activeTasks = tasks.filter((task) => task.status === column.id);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between w-full px-4 mb-2">
        <button
          onClick={() =>
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : COLUMNS.length - 1))
          }
        >
          ◀
        </button>
        <button
          onClick={() =>
            setActiveIndex((prev) => (prev < COLUMNS.length - 1 ? prev + 1 : 0))
          }
        >
          ▶
        </button>
      </div>
      <KanbanColumnMobile column={column} tasks={activeTasks} />
      <div className="flex flex-col gap-2 ">
        {tasks.map((task) => (
          <KanbanTaskCard
            key={task._id}
            task={task}
            onStatusChange={(_id, updates) => onStatusChange(_id, updates)}
          />
        ))}
      </div>
    </div>
  );
};
