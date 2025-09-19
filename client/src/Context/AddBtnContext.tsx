import { useState, createContext, type ReactNode, useContext } from "react";

export type AddTaskModal = {
  isOpen: boolean;
  currentTaskId: string | null;
  openModal: (id: string | null) => void;
  closeModal: () => void;
  isAlertOpen: boolean;
  openAlertModal: (id: string | null) => void;
  closeAlertModal: () => void;
};

export const AddBtnContext = createContext<AddTaskModal | undefined>(undefined);

export const AddBtnProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openModal = (id: string | null) => {
    setCurrentTaskId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentTaskId(null);
    setIsOpen(false);
  };

  const openAlertModal = (id: string | null) => {
    setCurrentTaskId(id);
    setIsAlertOpen(true);
  };

  const closeAlertModal = () => {
    console.log("geht geht");

    setCurrentTaskId(null);
    setIsAlertOpen(false);
  };

  return (
    <AddBtnContext.Provider
      value={{
        isOpen,
        currentTaskId,
        openModal,
        closeModal,
        isAlertOpen,
        openAlertModal,
        closeAlertModal,
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
