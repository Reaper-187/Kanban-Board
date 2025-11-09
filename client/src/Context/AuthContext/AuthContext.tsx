import { createContext, useContext, useState, type ReactNode } from "react";
import { AddBtnContext } from "../AddBtnContext";

export type AuthCheckProps = {
  userInfo: UserInfoProps;
  handleSuccessLogin: (data: { sessionInfo: SessionInfo }) => void;
};

export type UserInfoProps = {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
};

type SessionInfo = {
  sessionUserID: string;
  sessionUserRole: string;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthCheckProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    isAuthenticated: false,
    userId: null,
    userRole: null,
  });

  const handleSuccessLogin = (data: { sessionInfo: SessionInfo }) => {
    setUserInfo({
      isAuthenticated: data.sessionInfo.isAuthenticated,
      userId: data.sessionInfo.sessionUserID,
      userRole: data.sessionInfo.sessionUserRole,
    });
  };

  return (
    <AuthContext.Provider value={{ userInfo, handleSuccessLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AddBtnContext);
  if (!context) {
    throw new Error(
      "useModal muss innerhalb von ModalProvider verwendet werden!"
    );
  }
  return context; // Garantiert, dass context den Typ AddTaskModal hat
};
