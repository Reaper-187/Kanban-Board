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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
      // <GuestRoute>
      // </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Register />,
      </>
    ),
  },
  //     <GuestRoute>
  //     </GuestRoute>
  // {
  //   path: "/reset-password-authentication",
  //   element: <ForgotPw />,
  // },
  // {
  //   path: "/verifyUser",
  //   element: (
  //     <VerificationRoute>
  //       <Verification />
  //     </VerificationRoute>
  //   ),
  // },
  // {
  //   path: "/One-Time-Otp",
  //   element: (
  //     <OtpRoute>
  //       <OneTimeOtp />
  //     </OtpRoute>
  //   ),
  // },
  // {
  //   path: "/change-password",
  //   element: (
  //     <OtpRoute>
  //       <ChangePasswordPage />
  //     </OtpRoute>
  //   ),
  // },
  {
    element: <App />,
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
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
