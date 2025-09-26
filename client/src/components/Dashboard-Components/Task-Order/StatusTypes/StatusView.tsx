import { ListContainer } from "../List-view/ListContainer";
import { TableContainer } from "../Table-view/TableContainer";
import { KanbanHeader } from "../Kanban-view/KanbanHeader";
import type { Column as ColumnType, Task } from "@/components/Types/types";
import type { ColumnProps } from "./StatusTypes";

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
        <KanbanHeader
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
    case "table":
      return <TableContainer column={column} tasks={tasks} />;
    default:
      return null;
  }
};
