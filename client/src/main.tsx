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
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar.tsx";
import { AddBtnProvider } from "./Context/AddBtnContext.tsx";

const router = createBrowserRouter([
  // {
  //   path: "/login",
  //   element: (
  //     <GuestRoute>
  //       <Login />
  //     </GuestRoute>
  //   ),
  // },
  // {
  //   path: "/register",
  //   element: (
  //     <GuestRoute>
  //       <Register />
  //     </GuestRoute>
  //   ),
  // },
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
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <Toaster />
      <AppSidebar />
      <AddBtnProvider>
        <SidebarTrigger />
        <RouterProvider router={router} />
      </AddBtnProvider>
    </SidebarProvider>
  </StrictMode>
);
