import { Card } from "@/components/ui/card";
import { PlusIcon, type LucideIcon } from "lucide-react";
import { useToggle } from "@/Context/AddBtnContext";
import { TaskCard } from "../../Task-Card/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

type StatusType = "To-Do" | "Doing" | "Done";

type Task = {
  id: string;
  status: StatusType;
  topic: string;
  topicDetail: string;
  importance: string;
  date: string;
};

type StatusTypeProps = {
  Icon: LucideIcon;
  status: StatusType;
  outcome: number;
  tasks: Task[];
};

export const StatusTypes = ({
  Icon,
  status,
  outcome,
  tasks,
}: StatusTypeProps) => {
  const { toggleOpen } = useToggle();

  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { type: "column", status }, //debug
  });

  console.log("Dropzone registered:", status);

  return (
    <div
      className="flex flex-col p-4 bg-gray-100 rounded-sm 
                w-full sm:w-[48%] md:w-[31%] lg:w-1/4"
    >
      <Card className="flex justify-between items-center flex-row px-3 py-3 mb-3 transition-ease duration-300 hover:shadow-xl">
        <div className="flex justify-evenly items-center space-x-2">
          <p className="rounded-full bg-red-200 p-1 w-fit">
            <Icon size={13} />
          </p>
          <h3 className="font-semibold">{status}</h3>
          <span className="bg-gray-200 rounded-sm px-1 text-sm">
            {outcome} Tasks
          </span>
        </div>
        <PlusIcon
          onClick={toggleOpen}
          size={15}
          className="cursor-pointer hover:bg-gray-200 rounded-full"
        />
      </Card>
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 transition-colors duration-200 ${
          isOver ? "bg-blue-100" : ""
        }`}
        style={{ willChange: "transform" }}
      >
        <SortableContext items={tasks.map((t) => t.id)}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} {...task} status={status} />
            ))
          ) : (
            <p>No tasks yet</p>
          )}
        </SortableContext>
      </div>
    </div>
  );
};
