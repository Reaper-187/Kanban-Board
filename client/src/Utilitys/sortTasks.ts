import type { Importance, Task } from "@/components/Types/types";

type SortOptions = {
  status?: string; // optionaler Status-Filter
  importance?: string[]; // ["Urgent", "High"]
  importanceOrder?: "asc" | "desc";
  dateOrder?: "asc" | "desc";
};

// Reihenfolge für Importance festlegen
export const IMPORTANCE_ORDER: Importance[] = [
  "Urgent",
  "Lead",
  "High",
  "Normal",
  "Low",
];

// wenn ich utilitys schreibe kann alles ifs sein....

export const processTasks = (tasks: Task[], options: SortOptions): Task[] => {
  //   Filtern nach Status (nur offene Tasks)
  let sortedTasks = [...tasks];

  if (options.status && options.status !== "All Tasks") {
    sortedTasks = sortedTasks.filter((task) => task.status === options.status);
  }

  // Filtern nach Importance (nur Urgent und High)
  if (options.importance && !options.importance.includes("all")) {
    tasks = tasks.filter((task) =>
      options.importance?.includes(task.importance)
    );
  }

  // Sortieren nach Importance & Datum (asc/desc)

  if (options.importanceOrder) {
    const factor = options.importanceOrder === "asc" ? 1 : -1;
    tasks.sort(
      (a, b) =>
        (IMPORTANCE_ORDER.indexOf(a.importance) -
          IMPORTANCE_ORDER.indexOf(b.importance)) *
        factor
    );
  }

  if (options.dateOrder) {
    const factor = options.dateOrder === "asc" ? 1 : -1;

    tasks.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;

      return (dateA - dateB) * factor;
    });
  }

  return sortedTasks;
};
