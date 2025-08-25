import type { Importance, SortOrder, Task } from "@/components/Types/types";

// Reihenfolge für Importance festlegen
export const IMPORTANCE_ORDER: Importance[] = [
  "Urgent",
  "Lead",
  "High",
  "Normal",
  "Low",
];

export const sortTasks = (tasks: Task[], sortOrder: SortOrder): Task[] => {
  return [...tasks].sort((a, b) => {
    if (sortOrder === "importanceAsc") {
      return (
        IMPORTANCE_ORDER.indexOf(a.importance) -
        IMPORTANCE_ORDER.indexOf(b.importance)
      );
    }

    if (sortOrder === "importanceDesc") {
      return (
        IMPORTANCE_ORDER.indexOf(b.importance) -
        IMPORTANCE_ORDER.indexOf(a.importance)
      );
    }

    if (sortOrder === "dueDateDesc") {
      return new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime();
    }

    if (sortOrder === "dueDateAsc") {
      return new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();
    }

    return 0; // wenn sortOrder === "none"
  });
};
