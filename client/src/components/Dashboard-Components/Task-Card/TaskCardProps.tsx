import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

type TaskProps = {
  topic: string;
  topicDetail: string;
  importance: string;
  date: string;
  initStatus: string;
};

export const TaskCardProps = ({
  topic,
  topicDetail,
  importance,
  date,
  initStatus,
}: TaskProps) => {
  return (
    <Card className="p-3" key={initStatus}>
      <div className="flex justify-between">
        <h3>{topic}</h3>
        <span>. . .</span>
      </div>
      <p>{topicDetail}</p>
      <div className="flex space-x-2">
        <li className="bg-green-200 px-2 rounded-xl">{importance}</li>
      </div>
      <div className="flex items-center gap-1">
        <Calendar size={16} />
        <span>Due Date: {date}</span>
      </div>
    </Card>
  );
};
