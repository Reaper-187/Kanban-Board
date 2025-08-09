import { Flag } from "lucide-react";
import { StatusTypes } from "./StatusTypes";

const statusData = [
  {
    Icon: Flag,
    status: "To Do",
    outcome: 0,
  },
  {
    Icon: Flag,
    status: "Doing",
    outcome: 0,
  },
  {
    Icon: Flag,
    status: "Doing",
    outcome: 0,
  },
];

export const TaskContainer = () => {
  return (
    <div className="flex justify-evenly">
      {statusData.map((eachStatus) => (
        <StatusTypes
          Icon={eachStatus.Icon}
          status={eachStatus.status}
          outcome={eachStatus.outcome}
        />
      ))}
    </div>
  );
};
