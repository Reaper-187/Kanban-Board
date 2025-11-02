import { KanbanTaskCard } from "../../Task-Card/Kanban-Card/KanbanTaskCard";
import { Card } from "@/components/ui/card";
import { useDroppable } from "@dnd-kit/core";
import type { HeaderProps } from "../StatusTypes/StatusView";
import { KanbanHeader } from "./KanbanHeader";

export const KanbanContainer = ({
  column,
  tasks,
  onStatusChange,
}: HeaderProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <section className="min-w-80 w-80 shrink-0 flex flex-col">
      <Card className="flex items-center justify-between p-3 mb-2">
        <div ref={setNodeRef} className="min-h-30 min-w-full">
          <KanbanHeader column={column} tasks={tasks} />
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
      </Card>
    </section>
  );
};
