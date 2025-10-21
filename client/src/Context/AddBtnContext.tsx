import type { Task } from "@/components/Types/types";
import { useState, createContext, type ReactNode, useContext } from "react";

export type AddTaskModal = {
  isOpen: boolean;
  currentTask: Task | null;
  multipleTasks: Task[] | null;
  openModal: (task?: Task) => void;
  closeModal: () => void;
  isAlertOpen: boolean;
  openAlertModal: (task: Task) => void;
  multipleDeleteAlert: (tasks: Task[]) => void;
  closeAlertModal: () => void;
  isDescriptionOpen: boolean;
  openDescription: (task: Task) => void;
  closeDescription: () => void;
};

export const AddBtnContext = createContext<AddTaskModal | undefined>(undefined);

export const AddBtnProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [multipleTasks, setMultipleTasks] = useState<Task[] | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const openModal = (task?: Task) => {
    setCurrentTask(task ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentTask(null);
    setIsOpen(false);
  };

  const openAlertModal = (task?: Task) => {
    setCurrentTask(task ?? null);
    setIsAlertOpen(true);
  };

  const multipleDeleteAlert = (tasks?: Task[]) => {
    setMultipleTasks(tasks ?? null);
    setIsAlertOpen(true);
  };

  const closeAlertModal = () => {
    setCurrentTask(null);
    setMultipleTasks(null);
    setIsAlertOpen(false);
  };

  const openDescription = (task: Task) => {
    setCurrentTask(task);
    setIsDescriptionOpen(true);
  };

  const closeDescription = () => {
    setCurrentTask(null);
    setIsDescriptionOpen(false);
  };

  return (
    <AddBtnContext.Provider
      value={{
        isOpen,
        currentTask,
        multipleDeleteAlert,
        multipleTasks,
        openModal,
        closeModal,
        isAlertOpen,
        openAlertModal,
        closeAlertModal,
        isDescriptionOpen,
        openDescription,
        closeDescription,
      }}
    >
      {children}
    </AddBtnContext.Provider>
  );
};

export const useToggle = () => {
  const context = useContext(AddBtnContext);
  if (!context) {
    throw new Error(
      "useModal muss innerhalb von ModalProvider verwendet werden!"
    );
  }
  return context; // Garantiert, dass context den Typ AddTaskModal hat
};
