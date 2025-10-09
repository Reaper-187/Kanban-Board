import {
  DropdownFilterStatus,
  DropdownSorting,
} from "../DropDownMenu/DropDown";
import type { ImportanceFilter, SortOrder } from "../Types/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface DashboardNavProps {
  filter: (status: string) => void; // Oder: React.Dispatch<React.SetStateAction<string>>
  sortOrder: SortOrder;
  setSortOrder: (statusSorting: SortOrder) => void;
  importanceFilter: ImportanceFilter[];
  setImportanceFilter: (singleImportance: ImportanceFilter[]) => void;
  viewType: string;
}

export const DashboardNav = ({
  filter,
  sortOrder,
  setSortOrder,
  importanceFilter,
  setImportanceFilter,
  viewType,
}: DashboardNavProps) => {
  const handleStatusFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    filter(e.currentTarget.value);
  };

  return (
    <>
      <div className="flex justify-between p-2">
        <div className="flex space-x-5">
          <div className={viewType === "table" ? "hidden" : "block"}>
            <Input placeholder="Search tasks...." />
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
        <div className="space-x-5 mr-5">
          <DropdownSorting
            value={sortOrder}
            onChangeSort={(val) => setSortOrder(val as SortOrder)}
          />
          <DropdownFilterStatus
            value={importanceFilter}
            onChangeMultiFilter={(newValues) => setImportanceFilter(newValues)}
          />
        </div>
      </div>
    </>
  );
};
