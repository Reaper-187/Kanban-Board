import { useEffect, useMemo, useState } from "react";
import { StatusTypes } from "./StatusTypes/StatusTypes";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  COLUMNS,
  type Task,
  type TaskContainerProps,
} from "@/components/Types/types";
import { KanbanTaskCard } from "../Task-Card/Kanban-Card/KanbanTaskCard";
import { processTasks, type SortOptions } from "@/Utilitys/sortTasks";
import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "@/services/taskServices";
import { useUpdateTask } from "@/hooks/TaskHooks/useUpdateTask";
import { TableContainer } from "./Table-view/TableContainer";
import { KanbanMobile } from "./KanbanResponsive/KanbanMobile";
import { useMediaQuery } from "@uidotdev/usehooks";

const fitlerForATaks = ["_id"];

export const TaskContainer = ({
  viewType,
  filtertrigger,
  sortOrder,
  singleFilter,
  serachFilter,
}: TaskContainerProps) => {
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    status: [],
    importanceOrder: undefined,
    dateOrder: undefined,
    importance: [],
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [activeIndex, setActiveIndex] = useState(0);

  const { data: fetchTaskData = [] } = useQuery({
    queryFn: fetchTask,
    queryKey: ["tasks"],
  });

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const { mutate } = useUpdateTask();

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id;
    const task =
      fetchTaskData.find((taskCard) => taskCard._id === taskId) || null;
    setActiveTask(task);
  };

  // für status änderung durch button
  const handleStatusChange = (_id: string, updates: Partial<Task>) => {
    mutate({ _id, updates });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    const task = fetchTaskData.find((t) => t._id === taskId);
    if (!task) return;

    // Wenn alter Status gleich neuer Status => nichts tun (req sparen)
    if (task.status === newStatus) {
      return;
    }

    mutate({
      _id: taskId,
      updates: { status: newStatus },
    });
  };

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

  return (
    <div
      className={
        viewType != "kanban" ? "w-full p-1 gap-4" : "flex w-full justify-center"
      }
    >
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        {isMobile ? (
          <KanbanMobile
            column={COLUMNS[activeIndex]}
            tasks={filteredData.filter(
              (task) => task.status === COLUMNS[activeIndex].id
            )}
            onStatusChange={handleStatusChange}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ) : viewType === "table" ? (
          <TableContainer
            tasks={filteredData}
            onStatusChange={handleStatusChange}
          />
        ) : (
          visibleColumns.map((column) => {
            const filteredTasks = filteredData
              // Filter nach Status
              .filter((task) => task.status === column.id)
              // wenn SearchFilter aktiv
              .filter((task) =>
                serachFilter ? task._id.includes(serachFilter) : true
              );

            return (
              <StatusTypes
                key={column.id}
                column={column}
                tasks={filteredTasks}
                onStatusChange={handleStatusChange}
                viewType={viewType}
              />
            );
          })
        )}

        <DragOverlay dropAnimation={null}>
          {activeTask && (
            <KanbanTaskCard
              task={activeTask}
              onStatusChange={handleStatusChange}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
