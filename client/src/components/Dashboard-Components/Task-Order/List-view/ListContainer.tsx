import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusIcon } from "lucide-react";
import { useToggle } from "@/Context/AddBtnContext";
import { TaskCardList } from "../../Task-Card/ListCards/TaskCardList";
import type { HeaderProps } from "../StatusTypes/StatusView";
import { Button } from "@/components/ui/button";

export const ListContainer = ({
  column,
  tasks,
  onStatusChange,
}: HeaderProps) => {
  const { openModal } = useToggle();

  return (
    <div className="flex gap-4">
      <Accordion
        type="single"
        collapsible
        className="w-full p-1 m-3 border border-red-200 rounded-md"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="grid grid-cols-4 gap-5 w-full px-2">
              <span className="rounded-full bg-green-400 p-1 flex w-fit justify-center">
                <column.Icon size={13} />
              </span>
              <p>{column.title}</p>
              <span className="bg-gray-200 rounded-sm px-1 text-sm  text-center w-fit">
                {tasks.length} Tasks
              </span>
              <PlusIcon
                size={25}
                type="button"
                onClick={() => openModal(null)}
                className="p-1 rounded-full transition duration-300 cursor-pointer hover:bg-gray-200  flex justify-center w-fit"
                aria-label="Add task"
              />
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <TaskCardList
                  key={task._id}
                  task={task}
                  onStatusChange={(newStatus: string) =>
                    onStatusChange(task._id, { status: newStatus })
                  }
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
