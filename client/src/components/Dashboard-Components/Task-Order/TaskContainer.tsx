import { Flag } from "lucide-react";
import { StatusTypesProps } from "./StatusTypes/StatusTypesProps";

const statusData = [
  {
    Icon: Flag,
    status: "To-Do",
    outcome: 0,
  },
  {
    Icon: Flag,
    status: "Doing",
    outcome: 0,
  },
  {
    Icon: Flag,
    status: "Done",
    outcome: 0,
  },
];

interface TaskContainerProps {
  filtertrigger: string;
}

export const TaskContainer = ({ filtertrigger }: TaskContainerProps) => {
  const filteredData =
    filtertrigger === "All Tasks" || !filtertrigger
      ? statusData
      : statusData.filter((item) => item.status === filtertrigger);

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
