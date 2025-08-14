import { DropdownMenuCardOptions } from "@/components/DropDownMenu/DropDown";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

type TaskProps = {
  id: string;
  topic: string;
  topicDetail: string;
  importance: string;
  date: string;
};

const importanceColor = [
  { Urgent: "bg-red-600" },
  { Lead: "bg-orange-400" },
  { High: "bg-red-400" },
  { Medium: "bg-yellow-200" },
  { Low: "bg-gray-200" },
];

export const TaskCard = ({
  topic,
  topicDetail,
  importance,
  date,
}: TaskProps) => {
  const foundImportance: any = importanceColor.find((color) =>
    Object.keys(color).includes(importance)
  );

  const colorPick = foundImportance ? foundImportance[importance] : "";

  return (
    <Card className="p-3 my-1">
      <div className="flex justify-between">
        <h3 className="font-bold">{topic}</h3>
        <DropdownMenuCardOptions />
      </div>
      <p className="font-semibold">{topicDetail}</p>
      <div className="flex space-x-2">
        <span
          className={colorPick ? `${colorPick} px-2 rounded-xl text-base` : ""}
        >
          {importance}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar size={16} />
        <span className="font-medium">Due Date: {date}</span>
      </div>
    </Card>
  );
};
