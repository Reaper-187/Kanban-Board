import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface DashboardNavProps {
  filter: (status: string) => void; // Oder: React.Dispatch<React.SetStateAction<string>>
}

export const DashboardNav = ({ filter }: DashboardNavProps) => {
  const handleStatusFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    filter(e.currentTarget.value);
  };

  return (
    <>
      <div className="flex justify-between p-2">
        <div className="flex space-x-5">
          <div>
            <Input />
            <span className="stripe"></span>
          </div>
          <div className="space-x-5">
            <Button value="All Tasks" onClick={handleStatusFilter}>
              All Tasks
            </Button>
            <Button value="TODO" onClick={handleStatusFilter}>
              To do
            </Button>
            <Button value="IN_PROGRESS" onClick={handleStatusFilter}>
              Doing
            </Button>
            <Button value="DONE" onClick={handleStatusFilter}>
              Done
            </Button>
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
