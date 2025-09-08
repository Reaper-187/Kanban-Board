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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchTask, updateTask } from "@/services/taskServices";

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
  const [statusChange, setStatusChange] = useState("");
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    status: [],
    importanceOrder: undefined,
    dateOrder: undefined,
    importance: [],
  });

  const { data: fetchTaskData = [] } = useQuery({
    queryFn: fetchTask,
    queryKey: ["tasks"],
  });

  console.log("fetchTaskData", fetchTaskData);

  const visibleColumns = useMemo(() => {
    if (filtertrigger && filtertrigger !== "All Tasks") {
      return COLUMNS.filter((col) => col.id === filtertrigger);
    }
    return COLUMNS;
  }, [filtertrigger]);

  const filteredData = useMemo(() => {
    let processed = processTasks(fetchTaskData, sortOptions);

    return processed;
  }, [fetchTaskData, sortOptions, filtertrigger]);

  useEffect(() => {
    if (sortOrder === "importanceDown") {
      setSortOptions((prev) => ({ ...prev, importanceOrder: "desc" }));
    } else if (sortOrder === "importanceUp") {
      setSortOptions((prev) => ({ ...prev, importanceOrder: "asc" }));
    }

    if (sortOrder === "dueDateDown") {
      setSortOptions((prev) => ({ ...prev, dateOrder: "desc" }));
    } else if (sortOrder === "dueDateUp") {
      setSortOptions((prev) => ({ ...prev, dateOrder: "asc" }));
    }

    setSortOptions((prev) => ({
      ...prev,
      importance: singleFilter.length ? singleFilter : undefined,
    }));
  }, [singleFilter, sortOrder]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];
    fetchTaskData.map((task) =>
      task._id === taskId
        ? {
            ...task,
            status: newStatus,
          }
        : task
    );
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ _id, status }: { _id: string; status: Task["status"] }) =>
      updateTask(_id, status),
    onSuccess: async (data) => {
      console.log(`Task auf ${data} verschoben`);
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: Error) => {
      console.error("Fehler beim verschieben der Task", err);
    },
  });

  const handleStatusChange = (_id: string, status: Task["status"]) => {
    const data = {
      _id,
      status,
    };
    mutate(data);
  };

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id;
    const task = fetchTaskData.find((t) => t._id === taskId) || null;
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
