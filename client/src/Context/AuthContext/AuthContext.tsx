import { checkUserAuth, getUserInfo } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type AuthCheckProps = {
  sessionInfo: SessionInfoProps;
  loadingSpinner: string;
  userInfo: UserInfoProps;
};

export type SessionInfoProps = {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
};

export type UserInfoProps = {
  userId: string | null;
  userRole: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  provider: "google" | "github" | null;
};

type LoadingStatus = "loading" | "authenticated" | "unauthenticated";

export const AuthContext = createContext<AuthCheckProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loadingSpinner, setLoadingSpinner] =
    useState<LoadingStatus>("loading");

  const [sessionInfo, setSessionInfo] = useState<SessionInfoProps>({
    isAuthenticated: false,
    userId: null,
    userRole: null,
  });

  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    userId: null,
    userRole: null,
    firstName: null,
    lastName: null,
    email: null,
    avatar: null,
    provider: null,
  });

  const {
    data: sessionData,
    isLoading: sessionLoading,
    error: sessionError,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: checkUserAuth,
  });

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: sessionInfo.isAuthenticated, // getUserInfo geht erst los wenn true ist
  });

  useEffect(() => {
    if (sessionLoading) {
      setLoadingSpinner("loading");
    } else if (sessionError || !sessionData?.isAuthenticated) {
      setSessionInfo({
        isAuthenticated: false,
        userId: null,
        userRole: null,
      });
      setLoadingSpinner("unauthenticated");
    } else if (sessionData?.isAuthenticated) {
      setSessionInfo({
        isAuthenticated: true,
        userId: sessionData.userId,
        userRole: sessionData.userRole,
      });
      setLoadingSpinner("authenticated");
    }
  }, [sessionData, sessionLoading, sessionError]);

  useEffect(() => {
    if (!userData) return;

    const isSocialUser = !!userData.provider;

    setUserInfo({
      userId: userData.userId ?? null,
      userRole: userData.userRole ?? null,

      firstName: isSocialUser
        ? userData.name?.split(" ")[0] ?? null
        : userData.firstName ?? null,

      lastName: isSocialUser
        ? userData.name?.split(" ")[1] ?? null
        : userData.lastName ?? null,

      email: userData.email ?? null,
      avatar: isSocialUser ? userData.avatar ?? null : null,
      provider: isSocialUser ? userData.provider : null,
    });
  }, [userData]);

  return (
    <AuthContext.Provider value={{ sessionInfo, loadingSpinner, userInfo }}>
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
