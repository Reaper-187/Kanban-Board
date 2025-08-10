import { useState, createContext, type ReactNode, useContext } from "react";

type AddTaskModal = {
  isOpen: boolean;
  toggleOpen: () => void;
};

export const AddBtnContext = createContext<AddTaskModal | undefined>(undefined);

export const AddBtnProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <AddBtnContext.Provider value={{ isOpen, toggleOpen }}>
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
