import { ListContainer } from "../List-view/ListContainer";
import { TableContainer } from "../Table-view/TableContainer";
import { KanbanHeader } from "../Kanban-view/KanbanHeader";
import type { Column as ColumnType, Task } from "@/components/Types/types";

export type ColumnsHeaderInfo = {
  column: ColumnType;
  tasks: Task[];
  viewType: string;
};

export const StatusHeder = ({
  column,
  tasks,
  viewType,
}: Partial<ColumnsHeaderInfo>) => {
  switch (viewType) {
    case "kanban":
      return <KanbanHeader column={column} tasks={tasks} />;
    case "list":
      return <ListContainer column={column} tasks={tasks} />;
    case "table":
      return <TableContainer column={column} tasks={tasks} />;
    default:
      return null;
  }
};
