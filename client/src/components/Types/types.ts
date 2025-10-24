import { Flag, type LucideIcon } from "lucide-react";

export type Column = {
  id: string;
  title: string;
  outcome: number;
  Icon: LucideIcon;
};

export const COLUMNS: Column[] = [
  { id: "TODO", title: "To Do", outcome: 0, Icon: Flag },
  { id: "IN_PROGRESS", title: "In Progress", outcome: 0, Icon: Flag },
  { id: "DONE", title: "Done", outcome: 0, Icon: Flag },
];

export type Task = {
  _id: string;
  topic: string;
  description: string;
  status: string;
  importance: Importance;
  file: File[] | null;
  date: Date;
  comment: {
    userId: string;
    userName: string;
    text: string;
    timeStamp: Date;
  }[];
};

export interface RequestData {
  topic: string;
  description: string;
  importance?: Importance;
  file?: File[] | null;
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
