import { useMediaQuery } from "@uidotdev/usehooks";
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

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <div
        className={`flex ${
          isMobile ? "justify-center" : "justify-between"
        } p-2`}
      >
        <div className={isMobile ? "hidden" : "flex space-x-5"}>
          <div
            className={viewType === "table" ? "hidden" : "flex items-center"}
          >
            <Input placeholder="Search tasks...." />
            <span className="bg-gray-400 ml-5 w-[1px] h-[90%]"></span>
          </div>
          <div className="space-x-3 flex flex-wrap gap-1">
            <Button
              className="w-[70px] lg:w-fit"
              value="All Tasks"
              onClick={handleStatusFilter}
            >
              All Tasks
            </Button>
            <Button
              className="w-[70px]"
              value="TODO"
              onClick={handleStatusFilter}
            >
              To do
            </Button>
            <Button
              className="w-[70px]"
              value="IN_PROGRESS"
              onClick={handleStatusFilter}
            >
              Doing
            </Button>
            <Button
              className="w-[70px]"
              value="DONE"
              onClick={handleStatusFilter}
            >
              Done
            </Button>
          </div>
        </div>
        <div className={`flex flex-wrap space-x-3 ${!isMobile && "mr-3"}`}>
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
