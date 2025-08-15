import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

type TaskProps = {
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

// // Partian = jedes onj darf etwas davon sein und muss nicht mit allem gefüllt werden
// const importanceColor: Partial<Color>[] = [
//   { Urgent: "bg-red-600" },
//   { Lead: "bg-orange-400" },
//   { High: "bg-red-400" },
//   { Medium: "bg-yellow-200" },
//   { Low: "bg-gray-200" },
// ];

const importanceColor: Record<keyof Color, string> = {
  Urgent: "bg-red-600",
  Lead: "bg-orange-400",
  High: "bg-red-400",
  Medium: "bg-yellow-200",
  Low: "bg-gray-200",
};

export const TaskCard = ({
  topic,
  topicDetail,
  importance,
  date,
}: TaskProps) => {
  // const foundImportance = importanceColor.find((color) =>
  //   Object.keys(color).includes(importance)
  // ) as Partial<Color> | undefined;

  // const colorPick = foundImportance?.[importance] ?? "";

  const colorPick = importanceColor[importance as keyof Color];

  return (
    // p-3 my-1 w-full
    // max-w-sm sm:max-w-md lg:max-w-lg
    // shadow-md hover:shadow-lg
    // transition-shadow duration-200

    <Card className="p-3 my-1 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3 transition-ease duration-300 hover:shadow-xl">
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
