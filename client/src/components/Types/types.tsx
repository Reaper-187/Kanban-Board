import type { LucideIcon } from "lucide-react";

export type Column = {
  id: string;
  title: string;
  outcome: number;
  Icon: LucideIcon;
};

export type Task = {
  id: string;
  topic: string;
  description: string;
  status: string;
  importance: Importance;
  date: Date | undefined;
};

export type Importance = "Urgent" | "Lead" | "High" | "Normal" | "Low";

export type SortOrder =
  | "none"
  | "importanceUp"
  | "importanceDown"
  | "dueDateAsc"
  | "dueDateDesc";
