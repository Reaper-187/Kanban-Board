import { useEffect, useMemo, useState } from "react";
import { Flag } from "lucide-react";
import { StatusTypes } from "./StatusTypes/StatusTypes";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type {
  Column,
  ImportanceFilter,
  SortOrder,
  Task,
} from "@/components/Types/types";
import { TaskCard } from "../Task-Card/TaskCard";
import { INITIAL_TASKS } from "@/components/Mock/mockTasks";
import { processTasks, type SortOptions } from "@/Utilitys/sortTasks";

export const COLUMNS: Column[] = [
  { id: "TODO", title: "To Do", outcome: 0, Icon: Flag },
  { id: "IN_PROGRESS", title: "In Progress", outcome: 0, Icon: Flag },
  { id: "DONE", title: "Done", outcome: 0, Icon: Flag },
];

interface TaskContainerProps {
  filtertrigger: string;
  sortOrder: SortOrder;
  singleFilter: ImportanceFilter[];
}

export const TaskContainer = ({
  filtertrigger,
  sortOrder,
  singleFilter,
}: TaskContainerProps) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    status: [],
    importanceOrder: undefined,
    dateOrder: undefined,
    importance: [],
  });

  const visibleColumns = useMemo(() => {
    if (filtertrigger && filtertrigger !== "All Tasks") {
      return COLUMNS.filter((col) => col.id === filtertrigger);
    }
    return COLUMNS;
  }, [filtertrigger]);

  const filteredData = useMemo(() => {
    let processed = processTasks(tasks, sortOptions);

    return processed;
  }, [tasks, sortOptions, filtertrigger]);

  useEffect(() => {
    if (sortOrder === "importanceDown") {
      setSortOptions((prev) => ({ ...prev, importanceOrder: "desc" }));
    } else if (sortOrder === "importanceUp") {
      setSortOptions((prev) => ({ ...prev, importanceOrder: "asc" }));
    }
  }, [sortOrder]);

  useEffect(() => {
    setSortOptions((prev) => ({
      ...prev,
      importance: singleFilter.length ? singleFilter : undefined,
    }));
  }, [singleFilter]);

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

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id;
    const task = tasks.find((t) => t.id === taskId) || null;
    setActiveTask(task);
  };

  return (
    <div className="flex gap-4 mx-auto">
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        {visibleColumns.map((column) => (
          <StatusTypes
            key={column.id}
            column={column}
            tasks={filteredData.filter((task) => task.status === column.id)}
            onStatusChange={handleStatusChange}
          />
        ))}

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} onStatusChange={handleStatusChange} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
