import { Card } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { Calendar } from "lucide-react";

type TaskProps = {
  id: string;
  topic: string;
  topicDetail: string;
  importance: string;
  date: string;
};

type Color = {
  Urgent: string;
  Lead: string;
  High: string;
  Medium: string;
  Low: string;
};

const importanceColor: Record<keyof Color, string> = {
  Urgent: "bg-red-600",
  Lead: "bg-orange-400",
  High: "bg-red-400",
  Medium: "bg-yellow-200",
  Low: "bg-gray-200",
};

export const TaskCard = ({
  id,
  topic,
  topicDetail,
  importance,
  date,
}: TaskProps) => {
  const colorPick = importanceColor[importance as keyof Color];

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
  };
  return (
    <Card
      id={id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-3 my-1 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3 transition-ease duration-300 hover:shadow-xl"
      style={style}
    >
      <div className="flex justify-between items-start flex-wrap">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
          {topic}
        </h3>
        <span>alert-Btn</span>
      </div>
      <p className="text-sm sm:text-base">{topicDetail}</p>
      <div className="flex flex-wrap gap-2">
        <span
          className={
            colorPick
              ? `${colorPick} px-2 py-1 rounded-xl text-xs sm:text-sm`
              : ""
          }
        >
          {importance}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs sm:text-sm">
        <Calendar size={16} />
        <span className="font-medium">Due Date: {date}</span>
      </div>
    </Card>
  );
};
