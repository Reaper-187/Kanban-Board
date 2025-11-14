import { useAuth } from "@/Context/AuthContext/AuthContext";
import { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loadingSpinner } = useAuth();

  if (loadingSpinner === "loading") {
    return <p>Pleas Wait</p>;
  }
  if (loadingSpinner === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (loadingSpinner === "authenticated") {
    return children;
  }
};
