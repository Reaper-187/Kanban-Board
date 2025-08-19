import { useState } from "react";
import { Flag } from "lucide-react";
import { StatusTypes } from "./StatusTypes/StatusTypes";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Column, Task } from "@/components/Types/types";

const COLUMNS: Column[] = [
  { id: "TODO", title: "To Do", outcome: 0, Icon: Flag },
  { id: "IN_PROGRESS", title: "In Progress", outcome: 0, Icon: Flag },
  { id: "DONE", title: "Done", outcome: 0, Icon: Flag },
];
interface TaskContainerProps {
  filtertrigger: string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "Urgent",
    status: "TODO",
    date: "11.05.2025",
  },
  {
    id: "2",
    status: "DONE",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "High",
    date: "11.05.2025",
  },
  {
    id: "3",
    status: "IN_PROGRESS",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "Lead",
    date: "11.05.2025",
  },
  {
    id: "4",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "Urgent",
    status: "TODO",
    date: "11.05.2025",
  },
  {
    id: "5",
    status: "DONE",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "High",
    date: "11.05.2025",
  },
  {
    id: "6",
    status: "IN_PROGRESS",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "Lead",
    date: "11.05.2025",
  },
];

export const TaskContainer = ({ filtertrigger }: TaskContainerProps) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const filteredData =
    filtertrigger === "All Tasks" || !filtertrigger
      ? COLUMNS
      : COLUMNS.filter((s) => s.id === filtertrigger);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  return (
    <div className="flex gap-4 overflow-x-auto mx-auto">
      <DndContext onDragEnd={handleDragEnd}>
        {filteredData.map((column) => {
          return (
            <StatusTypes
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)} // in Columns fetchen und filtern nicht hier wegen Performance (später)
            />
          );
        })}
      </DndContext>
    </div>
  );
};
