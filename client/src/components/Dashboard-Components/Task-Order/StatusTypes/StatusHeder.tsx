import { ListContainer } from "../List-view/ListContainer";
import { TableContainer } from "../Table-view/TableContainer";
import type { ColumnProps } from "./StatusTypes";
import { KanbanHeader } from "../Kanban-view/KanbanHeader";

export const StatusHeder = ({ column, tasks, viewType }: ColumnProps) => {
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
