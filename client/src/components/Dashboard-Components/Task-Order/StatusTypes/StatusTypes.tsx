import type { Column as ColumnType, Task } from "@/components/Types/types";
import { StatusView } from "./StatusView";

export type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onStatusChange: (_id: string, updates: Partial<Task>) => void;
  viewType: string;
};
export const StatusTypes = ({
  viewType,
  column,
  tasks,
  onStatusChange,
}: ColumnProps) => {
  return (
    <>
      <StatusView
        viewType={viewType}
        column={column}
        tasks={tasks}
        onStatusChange={onStatusChange}
      />
    </>
  );
};
