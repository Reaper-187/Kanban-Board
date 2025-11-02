import { useToggle } from "@/Context/AddBtnContext";
import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";
import { Kanban, ListChevronsDownUp, Plus, Table } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";

type ViewType = "kanban" | "list" | "table";
interface DashboardHeaderProps {
  toggleView: (view: ViewType) => void;
}

export const DashboardHeader = ({ toggleView }: DashboardHeaderProps) => {
  const { openModal } = useToggle();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <CardHeader>
        <div
          className={`flex ${
            isMobile ? "justify-center" : "w-1/2 justify-between"
          } items-center gap-4 lg:gap-0 lg:w-full`}
        >
          <div className={isMobile ? "hidden" : "flex items-center gap-3"}>
            <h1 className="font-semibold md:text-lg lg:text-xl">Tasks</h1>
            <div className="flex gap-5">
              <Button
                className="cursor-pointer focus:text-blue-400 text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2"
                onClick={() => toggleView("kanban")}
              >
                <Kanban className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Kanban</span>
              </Button>
              <Button
                className="cursor-pointer focus:text-blue-400 text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2"
                onClick={() => toggleView("list")}
              >
                <ListChevronsDownUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">List</span>
              </Button>
              <Button
                className="cursor-pointer focus:text-blue-400 text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2"
                onClick={() => toggleView("table")}
              >
                <Table className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Table</span>
              </Button>
            </div>
          </div>
          <Button className="cursor-pointer" onClick={() => openModal()}>
            <Plus />
            <span className="hidden md:inline">Add Task</span>
          </Button>
        </div>
      </CardHeader>
      <span className="stripe"></span>
    </>
  );
};
