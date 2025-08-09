import { Card } from "@/components/ui/card";
import { PlusIcon, type LucideIcon } from "lucide-react";

type StatusTypeProps = {
  Icon: LucideIcon;
  status: string;
  outcome: number;
};

export const StatusTypes = ({ Icon, status, outcome }: StatusTypeProps) => {
  return (
    <>
      <Card className="flex justify-between items-center w-1/5 flex-row px-3 py-3 mx-2">
        <div className="flex justify-evenly items-center space-x-2">
          <p className="rounded-full bg-red-200 p-1 w-fit">
            <Icon size={13} />
          </p>
          <h3 className="font-semibold">{status}</h3>
          <span className="bg-gray-200 rounded-sm px-1 text-sm">
            {outcome} Tasks
          </span>
        </div>
        <PlusIcon
          size={15}
          className="cursor-pointer hover:bg-gray-200 rounded-full"
        />
      </Card>
    </>
  );
};
