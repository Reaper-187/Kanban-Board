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
        className="w-full p-1 m-3 rounded-md border rounded-md"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="relative">
          <PlusIcon
            size={25}
            type="button"
            onClick={() => openModal()}
            className="absolute left-1/2 top-3 p-1 rounded-full transition duration-300 cursor-pointer hover:bg-gray-200"
            // className="p-1 rounded-full transition duration-300 cursor-pointer hover:bg-gray-200  flex justify-center w-fit"
            aria-label="Add task"
          />
          <AccordionTrigger>
            <div className="flex self-center px-2">
              <div className="flex gap-4">
                <span className="rounded-full bg-green-400 p-1 flex w-fit items-center justify-center">
                  <column.Icon size={16} />
                </span>
                <p className="font-bold">{column.title}</p>
                <span className="bg-gray-200 rounded-sm px-1 text-sm  text-center w-fit">
                  {tasks.length} Tasks
                </span>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <TaskCardList
                  key={task._id}
                  task={task}
                  onStatusChange={(_id, updates) => {
                    onStatusChange(_id, updates);
                  }}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
