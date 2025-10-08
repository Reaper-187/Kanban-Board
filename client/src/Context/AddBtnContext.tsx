import type { Task } from "@/components/Types/types";
import { useState, createContext, type ReactNode, useContext } from "react";

export type AddTaskModal = {
  isOpen: boolean;
  currentTask: Task | null;
  openModal: (task: Task) => void;
  closeModal: () => void;
  isAlertOpen: boolean;
  openAlertModal: (task: Task) => void;
  closeAlertModal: () => void;
  isDescriptionOpen: boolean;
  openDescription: (task: Task) => void;
  closeDescription: () => void;
};

export const AddBtnContext = createContext<AddTaskModal | undefined>(undefined);

export const AddBtnProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setcurrentTask] = useState<Task | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const openModal = (task: Task) => {
    setcurrentTask(task);
    setIsOpen(true);
  };

  const closeModal = () => {
    setcurrentTask(null);
    setIsOpen(false);
  };

  const openAlertModal = (task: Task) => {
    setcurrentTask(task);
    setIsAlertOpen(true);
  };

  const closeAlertModal = () => {
    setcurrentTask(null);
    setIsAlertOpen(false);
  };

  const openDescription = (task: Task) => {
    setcurrentTask(task);
    setIsDescriptionOpen(true);
  };

  const closeDescription = () => {
    setcurrentTask(null);
    setIsDescriptionOpen(false);
  };

  return (
    <AddBtnContext.Provider
      value={{
        isOpen,
        currentTask,
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
