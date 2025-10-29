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
      { path: "/", element: <Navigate to="/tasks" replace /> },
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
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </StrictMode>
);
