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
  importance: string;
  date: Date | undefined;
};
