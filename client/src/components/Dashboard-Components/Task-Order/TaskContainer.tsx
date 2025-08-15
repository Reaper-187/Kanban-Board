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
    importance: "High",
    date: "11.05.2025",
  },
  {
    id: "3",
    status: "To-Do",
    topic: "Monthly-Report",
    topicDetail: "Profit of the year Analytics",
    importance: "Lead",
    date: "11.05.2025",
  },
];

type StatusDataEntry = {
  Icon: typeof Flag;
  status: StatusType;
  outcome: number;
  tasks: Task[];
};

const statusData: StatusDataEntry[] = [
  { Icon: Flag, status: "To-Do", outcome: 0, tasks: [] },
  { Icon: Flag, status: "Doing", outcome: 0, tasks: [] },
  { Icon: Flag, status: "Done", outcome: 0, tasks: [] },
];

export const TaskContainer = ({ filtertrigger }: TaskContainerProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);

  const updateOutcome = statusData.map((statusEntry) => {
    const filterAllTasks = initialTasks.filter(
      (status) => status.status === statusEntry.status
    );
    return {
      ...statusEntry,
      outcome: filterAllTasks.length,
      tasks: filterAllTasks,
    };
  });

  const filteredData =
    filtertrigger === "All Tasks" || !filtertrigger
      ? updateOutcome
      : updateOutcome.filter((item) => item.status === filtertrigger);

  return (
    <div className="flex flex-wrap gap-4">
      {filteredData.map((eachStatus, index) => (
        <StatusTypesProps
          key={index}
          Icon={eachStatus.Icon}
          status={eachStatus.status}
          outcome={eachStatus.outcome}
          tasks={eachStatus.tasks}
        />
      ))}
    </div>
  );
};
