import { useToggle } from "@/Context/AddBtnContext";
import { motion } from "framer-motion";
import { Card, CardHeader } from "../ui/card";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar24 } from "../CalendarComp/DueDateCalendar";
import { DropdownMenuImportance } from "../DropDownMenu/DropDown";

export const AddTask = () => {
  const { isOpen, toggleOpen } = useToggle();

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto"
          >
            <Card className="relative p-5">
              <CardHeader className="mb-5 p-0">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                    Create To-Do
                  </h1>
                  <span
                    onClick={toggleOpen}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </span>
                </div>
              </CardHeader>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label>Header:</Label>
                  <Input placeholder="Topic" />
                </div>
                <div className="space-y-2">
                  <Label>Topic:</Label>
                  <Input placeholder="Nachname" />
                </div>
                <div className="space-y-2">
                  <DropdownMenuImportance />
                </div>
                <div className="space-y-2">
                  <Calendar24 />
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-between">
                <Button
                  className="w-full cursor-pointer md:w-fit font-semibold mt-4"
                  type="submit"
                >
                  Add to Board
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
