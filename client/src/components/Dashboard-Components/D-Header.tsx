import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";

export const DashboardHeader = () => {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold md:text-lg lg:text-xl">Tasks</h1>
          <Button>+ Add Task</Button>
        </div>
      </CardHeader>
      <span className="stripe"></span>
    </>
  );
};
