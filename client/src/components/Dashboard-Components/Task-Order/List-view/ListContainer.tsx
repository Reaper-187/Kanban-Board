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
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const ListContainer = ({
  column,
  tasks,
  onStatusChange,
}: HeaderProps) => {
  const { openModal } = useToggle();
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    closed: {
      scale: 1,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  // Content-Variants für den Inhalt
  const contentVariants = {
    closed: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Item-Variants für einzelne TaskCards
  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      scale: 0.95,
    },
    open: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="flex gap-4">
      <Accordion
        type="single"
        collapsible
        className="w-full p-1 m-3 rounded-md border"
        defaultValue="item-1"
        onValueChange={(value) => setIsOpen(value === "item-1")}
      >
        <AccordionItem value="item-1" className="relative">
          <PlusIcon
            size={25}
            type="button"
            onClick={() => openModal()}
            className="absolute left-1/2 top-3 p-1 rounded-full transition-all duration-300 cursor-pointer hover:bg-gray-200 hover:scale-110 active:scale-95"
            aria-label="Add task"
          />

          <motion.div
            variants={containerVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex self-center px-2">
                <div className="flex gap-4 items-center">
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className={`rounded-full ${column.color} p-1 flex w-fit items-center justify-center`}
                  >
                    <column.Icon size={16} />
                  </motion.span>
                  <p className="font-bold">{column.title}</p>
                  <motion.span
                    animate={{ scale: isOpen ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="bg-primary text-primary-foreground rounded-sm px-1 text-sm text-center w-fit"
                  >
                    {tasks.length} Tasks
                  </motion.span>
                </div>
              </div>
            </AccordionTrigger>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <motion.div
                      className="flex flex-col gap-2"
                      variants={{
                        open: {
                          transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.15,
                          },
                        },
                        closed: {
                          transition: {
                            staggerChildren: 0.05,
                            staggerDirection: -1,
                          },
                        },
                      }}
                    >
                      {tasks.map((task, index) => (
                        <motion.div
                          key={task._id}
                          variants={itemVariants}
                          custom={index}
                          whileHover={{
                            x: 5,
                            transition: { duration: 0.2 },
                          }}
                        >
                          <TaskCardList
                            task={task}
                            onStatusChange={(_id, updates) => {
                              onStatusChange(_id, updates);
                            }}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AccordionContent>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
