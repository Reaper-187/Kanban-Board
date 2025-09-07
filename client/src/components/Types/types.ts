import type { LucideIcon } from "lucide-react";

export type Column = {
  id: string;
  title: string;
  outcome: number;
  Icon: LucideIcon;
};

export type Task = {
  _id: string;
  topic: string;
  description: string;
  status: string;
  importance: Importance;
  date: Date;
};

export interface RequestData {
  topic: string;
  description: string;
  status: string;
  importance?: Importance;
  date?: Date;
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
