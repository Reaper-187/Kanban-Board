import { useMediaQuery } from "@uidotdev/usehooks";
import {
  DropdownFilterStatus,
  DropdownSorting,
} from "../DropDownMenu/DropDown";
import type { ImportanceFilter, SortOrder } from "../Types/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useToggle } from "@/Context/AddBtnContext";
import { motion } from "framer-motion";

interface DashboardNavProps {
  filter: (status: string) => void; // Oder: React.Dispatch<React.SetStateAction<string>>
  sortOrder: SortOrder;
  setSortOrder: (statusSorting: SortOrder) => void;
  importanceFilter: ImportanceFilter[];
  setImportanceFilter: (singleImportance: ImportanceFilter[]) => void;
  viewType: string;
  serachFilter: string;
  searchFilterFunc: (filterTaks: string) => void;
}

export const DashboardNav = ({
  filter,
  sortOrder,
  setSortOrder,
  importanceFilter,
  setImportanceFilter,
  viewType,
  serachFilter,
  searchFilterFunc,
}: DashboardNavProps) => {
  const { openModal } = useToggle();

  const handleStatusFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    filter(e.currentTarget.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchFilterFunc(e.target.value);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  const buttonVariants = {
    hidden: { opacity: 0, y: -20, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        stiffness: 100,
        damping: 10,
        delay: i * 0.07,
      },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        stiffness: 100,
        damping: 10,
        delay: i * 0.09,
      },
    }),
  };

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
            <Input
              placeholder="Search with Task-ID..."
              onChange={handleSearchChange}
              value={serachFilter}
            />

            <span className="bg-gray-400 ml-5 w-[1px] h-[90%]"></span>
          </div>
          <motion.div
            className="space-x-3 flex flex-wrap gap-1"
            initial="hidden"
            animate="visible"
          >
            <motion.div custom={1} variants={buttonVariants}>
              <Button
                className="w-[70px] lg:w-fit"
                value="All Tasks"
                onClick={handleStatusFilter}
              >
                All Tasks
              </Button>
            </motion.div>

            <motion.div custom={2} variants={buttonVariants}>
              <Button
                className="w-[70px]"
                value="TODO"
                onClick={handleStatusFilter}
              >
                To do
              </Button>
            </motion.div>

            <motion.div custom={3} variants={buttonVariants}>
              <Button
                className="w-[70px]"
                value="IN_PROGRESS"
                onClick={handleStatusFilter}
              >
                Doing
              </Button>
            </motion.div>

            <motion.div custom={4} variants={buttonVariants}>
              <Button
                className="w-[70px]"
                value="DONE"
                onClick={handleStatusFilter}
              >
                Done
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div initial="hidden" animate="visible">
          <div className={`flex flex-wrap space-x-3 ${!isMobile && "mr-3"}`}>
            <motion.div custom={0} variants={dropdownVariants}>
              <DropdownSorting
                value={sortOrder}
                onChangeSort={(val) => setSortOrder(val as SortOrder)}
              />
            </motion.div>
            <motion.div custom={1} variants={dropdownVariants}>
              <DropdownFilterStatus
                value={importanceFilter}
                onChangeMultiFilter={(newValues) =>
                  setImportanceFilter(newValues)
                }
              />
            </motion.div>

            <motion.div custom={2} variants={dropdownVariants}>
              <Button
                className={isMobile ? "cursor-pointer" : "hidden"}
                onClick={() => openModal()}
              >
                <Plus />
                <span className="hidden text-xs md:inline">Add Task</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
