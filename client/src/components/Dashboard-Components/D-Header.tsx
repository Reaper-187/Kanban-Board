import { useToggle } from "@/Context/AddBtnContext";
import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";

type ViewType = "kanban" | "list" | "table";
interface DashboardHeaderProps {
  toggleView: (view: ViewType) => void;
}

export const DashboardHeader = ({ toggleView }: DashboardHeaderProps) => {
  const { openModal } = useToggle();

  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold md:text-lg lg:text-xl">Tasks</h1>
            <div className="flex gap-5">
              <Button
                className="w-1/2 cursor-pointer"
                onClick={() => toggleView("kanban")}
              >
                Kanban
              </Button>
              <Button
                className="w-1/2 cursor-pointer"
                onClick={() => toggleView("list")}
              >
                List
              </Button>
              <Button
                className="w-1/2 cursor-pointer"
                onClick={() => toggleView("table")}
              >
                Table
              </Button>
            </div>
          </div>
          <Button className="cursor-pointer" onClick={() => openModal()}>
            + Add Task
          </Button>
        </div>
      </CardHeader>
      <span className="stripe"></span>
    </>
  );
};
