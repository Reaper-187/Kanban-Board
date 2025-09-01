export type Task = {
  topic: string;
  description: string;
  status: string;
  importance: Importance;
  date: Date | undefined;
};

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
