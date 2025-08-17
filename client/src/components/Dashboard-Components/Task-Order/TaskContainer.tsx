import { useState } from "react";
import { Flag } from "lucide-react";
import { StatusTypes } from "./StatusTypes/StatusTypes";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

type StatusType = "To-Do" | "Doing" | "Done";

type Task = {
  id: string;
  status: StatusType;
  topic: string;
  topicDetail: string;
  importance: string;
  date: string;
};

interface TaskContainerProps {
  filtertrigger: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    status: "To-Do",
    topic: "Monthly-Report",
    topicDetail: "Profit of the year Analytics",
    importance: "Urgent",
    date: "11.05.2025",
  },
  {
    id: "2",
    status: "Done",
    topic: "Monthly-Report",
    topicDetail: "Profit of the year Analytics",
    importance: "High",
    date: "11.05.2025",
  },
  {
    id: "3",
    status: "To-Do",
    topic: "Monthly-Report",
    topicDetail: "Profit of the year Analytics",
    importance: "Lead",
    date: "11.05.2025",
  },
];

type StatusDataEntry = {
  Icon: typeof Flag;
  status: StatusType;
  outcome: number;
  tasks: Task[];
};

const statusData: StatusDataEntry[] = [
  { Icon: Flag, status: "To-Do", outcome: 0, tasks: [] },
  { Icon: Flag, status: "Doing", outcome: 0, tasks: [] },
  { Icon: Flag, status: "Done", outcome: 0, tasks: [] },
];

export const TaskContainer = ({ filtertrigger }: TaskContainerProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);

  const filteredData =
    filtertrigger === "All Tasks" || !filtertrigger
      ? statusData
      : statusData.filter((s) => s.status === filtertrigger);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = allTasks.find((t) => t.id === active.id);
    const overTask = allTasks.find((t) => t.id === over.id);

    // Statuswechsel
    if (!overTask && over?.data?.current?.type === "column") {
      const newStatus = over.data.current.status as Task["status"];
      setAllTasks((prev) =>
        prev.map((task) =>
          task.id === active.id ? { ...task, status: newStatus } : task
        )
      );
      return;
    }

    // Reihenfolge innerhalb einer Spalte
    if (activeTask && overTask && activeTask.status === overTask.status) {
      const oldIndex = allTasks.indexOf(activeTask);
      const newIndex = allTasks.indexOf(overTask);
      const updated = [...allTasks];
      updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, activeTask);
      setAllTasks(updated);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto">
        {filteredData.map((statusEntry) => {
          const tasksForColumn = allTasks.filter(
            (task) => task.status === statusEntry.status
          );
          return (
            <StatusTypes
              key={statusEntry.status}
              Icon={statusEntry.Icon}
              status={statusEntry.status}
              outcome={tasksForColumn.length}
              tasks={tasksForColumn}
            />
          );
        })}
      </div>
    </DndContext>
  );
};
