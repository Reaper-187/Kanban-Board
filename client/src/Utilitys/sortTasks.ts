import type { Importance, Task } from "@/components/Types/types";

export type SortOptions = {
  status?: string[]; // optionaler Status-Filter
  importance?: string[]; // ["Urgent", "High"]
  importanceOrder?: "asc" | "desc";
  dateOrder?: "asc" | "desc";
};

// Reihenfolge für Importance festlegen
export const IMPORTANCE_ORDER: Importance[] = [
  "Low",
  "Urgent",
  "Lead",
  "High",
  "Normal",
];

// wenn ich utilitys schreibe kann alles ifs sein....

// hier geht es nur um die tasks selbst nicht columns
export const processTasks = (tasks: Task[], options: SortOptions): Task[] => {
  let sortedTasks = [...tasks];

  console.log(
    options.importance,
    "SASDASDASDAD",
    sortedTasks.map((t) => t.importance)
  );

  if (options.importance?.length) {
    sortedTasks = sortedTasks.filter((task) =>
      options.importance!.includes(task.importance)
    );
  }

  if (options.importanceOrder) {
    const factor = options.importanceOrder === "asc" ? 1 : -1;
    sortedTasks.sort(
      (a, b) =>
        (IMPORTANCE_ORDER.indexOf(a.importance) -
          IMPORTANCE_ORDER.indexOf(b.importance)) *
        factor
    );
  }

  if (options.dateOrder) {
    const factor = options.dateOrder === "asc" ? 1 : -1;
    sortedTasks.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return (dateA - dateB) * factor;
    });
  }

  return sortedTasks;
};
