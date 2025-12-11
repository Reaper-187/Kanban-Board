import { Flag, type LucideIcon } from "lucide-react";

export type Column = {
  id: string;
  title: string;
  outcome: number;
  Icon: LucideIcon;
  color: string;
};

export const COLUMNS: Column[] = [
  { id: "TODO", title: "To Do", outcome: 0, Icon: Flag, color: "bg-red-500" },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
    outcome: 0,
    Icon: Flag,
    color: "bg-yellow-500",
  },
  { id: "DONE", title: "Done", outcome: 0, Icon: Flag, color: "bg-green-500" },
];

export type TaskFile = {
  _id: string;
  path: string;
  name: string;
  size: number;
};

export type Task = {
  _id: string;
  topic: string;
  description: string;
  status: string;
  importance: Importance;
  file: TaskFile[] | null;
  newFiles?: File[] | null;
  date: Date;
  comment: {
    text: string;
  }[];
};

export interface RequestData {
  topic: string;
  description: string;
  importance?: Importance;
  newFiles?: File[] | null;
  date?: Date;
}

export interface UploadedFile {
  name: string;
  path: string;
  type: string;
  size: number;
}

export interface TaskContainerProps {
  filtertrigger: string;
  sortOrder: SortOrder;
  singleFilter: ImportanceFilter[];
  viewType: string;
  serachFilter: string;
}

export type Importance =
  | "Urgent"
  | "High"
  | "Lead"
  | "Internal"
  | "Medium"
  | "Low";

export type SortOrder =
  | "none"
  | "importanceUp"
  | "importanceDown"
  | "dueDateUp"
  | "dueDateDown";

export type ImportanceFilter =
  | "Urgent"
  | "Lead"
  | "High"
  | "Medium"
  | "Low"
  | "Internal";
