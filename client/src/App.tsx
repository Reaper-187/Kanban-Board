import { Outlet } from "react-router-dom";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Toaster } from "sonner";
import { AppSidebar } from "./components/Sidebar/app-sidebar";
import { AddBtnProvider } from "./Context/AddBtnContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Toaster />
        <AppSidebar />
        <AddBtnProvider>
          <SidebarTrigger />
          <main className="flex-1">
            <Outlet />
          </main>
        </AddBtnProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
