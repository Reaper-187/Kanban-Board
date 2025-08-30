import { Outlet } from "react-router-dom";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Toaster } from "sonner";
import { AppSidebar } from "./components/Sidebar/app-sidebar";
import { AddBtnProvider } from "./Context/AddBtnContext";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
