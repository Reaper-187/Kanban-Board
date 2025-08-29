import type { Task } from "../Types/types";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "Urgent",
    status: "TODO",
    date: new Date("2025-05-11"),
  },
  {
    id: "2",
    status: "DONE",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "Low",
    date: new Date("2025-03-12"),
  },
  {
    id: "3",
    status: "IN_PROGRESS",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "Lead",
    date: new Date("2025-05-11"),
  },
  {
    id: "4",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "Urgent",
    status: "TODO",
    date: new Date("2025-05-09"),
  },
  {
    id: "5",
    status: "DONE",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "High",
    date: new Date("2025-05-2"),
  },
  {
    id: "6",
    status: "IN_PROGRESS",
    topic: "Monthly-Report",
    description: "Profit of the year Analytics",
    importance: "Lead",
    date: new Date("2025-05-3"),
  },
];
