import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { KanbanHeaderProps } from "../Kanban-view/KanbanHeader";
import { PlusIcon } from "lucide-react";
import { TaskCard } from "../../Task-Card/TaskCard";
import { useToggle } from "@/Context/AddBtnContext";

export const ListContainer = ({ column, tasks }: KanbanHeaderProps) => {
  const { openModal } = useToggle();

  return (
    <div className="flex gap-4 mx-auto">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="rounded-full bg-red-200 p-1">
              <column.Icon size={13} />
            </span>
            {column.title}
            <span className="bg-gray-200 rounded-sm px-1 text-sm">
              {tasks.length} Tasks
            </span>
            <button
              type="button"
              onClick={() => openModal(null)}
              className="p-1 rounded-full transition duration-300 cursor-pointer hover:bg-gray-200"
              aria-label="Add task"
            >
              <PlusIcon size={15} />
            </button>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* <div className="flex flex-col gap-2 ">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={(newStatus: string) =>
                    onStatusChange(task._id, { status: newStatus })
                  }
                />
              ))}
            </div> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
