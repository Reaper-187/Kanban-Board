import { checkUserAuth } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type AuthCheckProps = {
  userInfo: UserInfoProps;
  loadingSpinner: string;
};

export type UserInfoProps = {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
};

type LoadingStatus = "loading" | "authenticated" | "unauthenticated";

export const AuthContext = createContext<AuthCheckProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["auth"],
    queryFn: checkUserAuth,
  });

  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    isAuthenticated: false,
    userId: null,
    userRole: null,
  });

  const [loadingSpinner, setLoadingSpinner] =
    useState<LoadingStatus>("loading");

  useEffect(() => {
    if (isLoading) {
      setLoadingSpinner("loading");
    } else if (error || !data?.isAuthenticated) {
      setUserInfo({
        isAuthenticated: false,
        userId: null,
        userRole: null,
      });
      setLoadingSpinner("unauthenticated");
    } else if (data?.isAuthenticated) {
      setUserInfo({
        isAuthenticated: true,
        userId: data.userId,
        userRole: data.userRole,
      });
      setLoadingSpinner("authenticated");
    }
  }, [data, isLoading, error]);

  return (
    <AuthContext.Provider value={{ userInfo, loadingSpinner }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useModal muss innerhalb von ModalProvider verwendet werden!"
    );
  }
  return context; // Garantiert, dass context den Typ AddTaskModal hat
};
