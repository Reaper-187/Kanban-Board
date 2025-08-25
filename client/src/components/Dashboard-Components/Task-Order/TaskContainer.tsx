import { useState } from "react";
import { Flag } from "lucide-react";
import { StatusTypes } from "./StatusTypes/StatusTypes";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { Column, SortOrder, Task } from "@/components/Types/types";
import { TaskCard } from "../Task-Card/TaskCard";
import { INITIAL_TASKS } from "@/components/Mock/mockTasks";

const COLUMNS: Column[] = [
  { id: "TODO", title: "To Do", outcome: 0, Icon: Flag },
  { id: "IN_PROGRESS", title: "In Progress", outcome: 0, Icon: Flag },
  { id: "DONE", title: "Done", outcome: 0, Icon: Flag },
];

interface TaskContainerProps {
  filtertrigger: string;
  sortOrder: SortOrder;
}

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

  const handleStatusChange = (id: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const taskId = event.active.id;
    const task = tasks.find((t) => t.id === taskId) || null;
    setActiveTask(task);
  }

  return (
    <div className="flex gap-4 mx-auto">
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        {filteredData.map((column) => {
          return (
            <StatusTypes
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)} // in Columns fetchen und filtern nicht hier wegen Performance (später)
              onStatusChange={handleStatusChange}
            />
          );
        })}

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} onStatusChange={handleStatusChange} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
