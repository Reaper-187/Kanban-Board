import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard.tsx";
import { Settings } from "./Pages/Settings.tsx";
import { ThemeContextProvider } from "./Context/ThemeContext.tsx";
import { Login } from "./Pages/Auth-Pages/Login.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Register } from "./Pages/Auth-Pages/Register.tsx";
import { AuthProvider } from "./Context/AuthContext/AuthContext.tsx";
import { ProtectedRoute } from "./hooks/AuthHooks/ProtectedRoute.tsx";
import { PublicRoute } from "./hooks/AuthHooks/PublicRoute.tsx";
import { ForgotPw } from "./Pages/Auth-Pages/ForgotPw.tsx";
import { OneTimeOtp } from "./Pages/Auth-Pages/OneTimeOtp.tsx";
import { Toaster } from "sonner";
import { NewPwPage } from "./Pages/Auth-Pages/NewPwPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <>
        <PublicRoute>
          <Login />
        </PublicRoute>
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <PublicRoute>
          <Register />
        </PublicRoute>
      </>
    ),
  },
  {
    path: "/reset-password-authentication",
    element: (
      <>
        <PublicRoute>
          <ForgotPw />
        </PublicRoute>
      </>
    ),
  },
  {
    path: "/multifactor-authentication-oneTimer",
    element: (
      <PublicRoute>
        <OneTimeOtp />
      </PublicRoute>
    ),
  },
  {
    path: "/new-password-authentication",
    element: (
      <PublicRoute>
        <NewPwPage />
      </PublicRoute>
    ),
  },
  // {
  //   path: "/verifyUser",
  //   element: (
  //     <VerificationRoute>
  //       <Verification />
  //     </VerificationRoute>
  //   ),
  // },
  {
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      {
        path: "tasks",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeContextProvider>
          <RouterProvider router={router} />
        </ThemeContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
