import { Spinner } from "@/components/Spinner/Spinner";
import { useAuth } from "@/Context/AuthContext/AuthContext";
import { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type PublicRouteProps = PropsWithChildren;

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { loadingSpinner } = useAuth();

  if (loadingSpinner === "loading") {
    return <Spinner />;
  }
  if (loadingSpinner === "authenticated") {
    return <Navigate to="/tasks" replace />;
  }
  if (loadingSpinner === "unauthenticated") {
    return children;
  }
  return null;
};
