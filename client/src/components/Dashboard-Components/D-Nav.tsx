import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const DashboardNav = () => {
  return (
    <>
      <div className="flex justify-between p-2">
        <div className="flex space-x-5">
          <div>
            <Input />
            <span className="stripe"></span>
          </div>
          <div className="space-x-5">
            <Button>All Tasks</Button>
            <Button>To do</Button>
            <Button>Doing</Button>
            <Button>Done</Button>
          </div>
        </div>
        <div className="space-x-5">
          <Button>Sort by</Button>
          <Button>Filter</Button>
        </div>
      </div>
    </>
  );
};
