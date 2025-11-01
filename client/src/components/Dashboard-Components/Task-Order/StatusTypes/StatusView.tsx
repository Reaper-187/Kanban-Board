import { ListContainer } from "../List-view/ListContainer";
import { KanbanContainer } from "../Kanban-view/KanbanContainer";
import { type Column as ColumnType, type Task } from "@/components/Types/types";
import type { ColumnProps } from "./StatusTypes";
import { KanbanMobile } from "../KanbanResponsive/KanbanMobile";

export type HeaderProps = {
  column: ColumnType;
  tasks: Task[];
  onStatusChange: (_id: string, updates: Partial<Task>) => void;
};

export const StatusView = ({
  column,
  tasks,
  onStatusChange,
  viewType,
}: ColumnProps) => {
  switch (viewType) {
    case "kanban":
      return (
        <KanbanContainer
          column={column}
          tasks={tasks}
          onStatusChange={onStatusChange}
        />
      );
    case "list":
      return (
        <ListContainer
          column={column}
          tasks={tasks}
          onStatusChange={onStatusChange}
        />
      );
    default:
      return null;
  }
};
