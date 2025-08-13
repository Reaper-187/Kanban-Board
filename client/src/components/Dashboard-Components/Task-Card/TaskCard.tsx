import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

type TaskProps = {
  id: string;
  topic: string;
  topicDetail: string;
  importance: string;
  date: string;
  status: string;
};

export const TaskCard = ({
  topic,
  topicDetail,
  importance,
  date,
  status,
}: TaskProps) => {
  return (
    <Card className="p-3" key={status}>
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
