import { TaskCardProps } from "./TaskCardProps";

const mockData = [
  {
    topic: "Monthly-Report",
    topicDetail: "Profit of the year Analytics",
    importance: "Urgent",
    date: "11.05.2025",
  },
];

export const TaskCard = () => {
  return (
    <div>
      {mockData.map((mockCards, index) => (
        <TaskCardProps
          key={index}
          topic={mockCards.topic}
          topicDetail={mockCards.topicDetail}
          importance={mockCards.importance}
          date={mockCards.date}
        />
      ))}
    </div>
  );
};
