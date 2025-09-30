import { useState, createContext, type ReactNode, useContext } from "react";

export type AddTaskModal = {
  isOpen: boolean;
  currentTaskId: string | null;
  openModal: (id: string | null) => void;
  closeModal: () => void;
  isAlertOpen: boolean;
  openAlertModal: (id: string | null) => void;
  closeAlertModal: () => void;
  isDescriptionOpen: boolean;
  openDescription: (id: string | null) => void;
  closeDescription: () => void;
};

export const AddBtnContext = createContext<AddTaskModal | undefined>(undefined);

export const AddBtnProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

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
    setCurrentTaskId(null);
    setIsAlertOpen(false);
  };

  const openDescription = (id: string | null) => {
    setCurrentTaskId(id);
    setIsDescriptionOpen(true);
  };

  const closeDescription = () => {
    setCurrentTaskId(null);
    setIsDescriptionOpen(false);
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
