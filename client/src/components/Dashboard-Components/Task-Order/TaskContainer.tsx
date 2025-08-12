import { Flag } from "lucide-react";
import { StatusTypesProps } from "./StatusTypes/StatusTypesProps";
import { useState } from "react";

type StatusType = "To-Do" | "Doing" | "Done";

type Task = {
  id: string;
  status: StatusType;
  topic: string;
  topicDetail: string;
  importance: string;
  date: string;
};

interface TaskContainerProps {
  filtertrigger: string;
}

type StatusCount = {
  [key in "To-Do" | "Doing" | "Done"]: number;
};

const initialTasks: Task[] = [
  {
    id: "1",
    status: "To-Do",
    topic: "Monthly-Report",
    topicDetail: "Profit of the year Analytics",
    importance: "Urgent",
    date: "11.05.2025",
  },
  {
    id: "2",
    status: "Done",
    topic: "Monthly-Report",
    topicDetail: "Profit of the year Analytics",
    importance: "Urgent",
    date: "11.05.2025",
  },
  {
    id: "3",
    status: "To-Do",
    topic: "Monthly-Report",
    topicDetail: "Profit of the year Analytics",
    importance: "Urgent",
    date: "11.05.2025",
  },
];

type StatusDataEntry = {
  Icon: typeof Flag;
  status: StatusType;
  outcome: number;
};

const statusData: StatusDataEntry[] = [
  { Icon: Flag, status: "To-Do", outcome: 0 },
  { Icon: Flag, status: "Doing", outcome: 0 },
  { Icon: Flag, status: "Done", outcome: 0 },
];

export const TaskContainer = ({ filtertrigger }: TaskContainerProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);

  const result = initialTasks.reduce<StatusCount>(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { "To-Do": 0, Doing: 0, Done: 0 }
  );

  const updateOutcome = statusData.map((statusEntry) => {
    const count = result[statusEntry.status] || 0;
    return {
      ...statusEntry,
      outcome: count,
    };
  });

  const filteredData =
    filtertrigger === "All Tasks" || !filtertrigger
      ? updateOutcome
      : updateOutcome.filter((item) => item.status === filtertrigger);

  return (
    <div className="flex">
      {filteredData.map((eachStatus, index) => (
        <StatusTypesProps
          key={index}
          Icon={eachStatus.Icon}
          status={eachStatus.status}
          outcome={eachStatus.outcome}
        />
      ))}
    </div>
  );
};
