import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";

export const DashboardHeader = () => {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold md:text-lg lg:text-xl">Tasks</h1>
            <div className="flex gap-5">
              <Button className="w-1/2 cursor-pointer">Kanban</Button>
              <Button className="w-1/2 cursor-pointer">List</Button>
            </div>
          </div>
          <Button>+ Add Task</Button>
        </div>
      </CardHeader>
      <span className="stripe"></span>
    </>
  );
};
