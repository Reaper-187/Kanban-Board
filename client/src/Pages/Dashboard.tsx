import { AddTask } from "@/components/Add-Task/AddTask";
import { DashboardHeader } from "@/components/Dashboard-Components/D-Header";
import { DashboardNav } from "@/components/Dashboard-Components/D-Nav";
import { TaskContainer } from "@/components/Dashboard-Components/Task-Order/TaskContainer";
import type { SortOrder } from "@/components/Types/types";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export const Dashboard = () => {
  const [filterStauts, setFilterStatus] = useState<string>("");

  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  return (
    <>
      <Card className="w-full">
        <DashboardHeader />
        <DashboardNav
          filter={setFilterStatus}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <TaskContainer filtertrigger={filterStauts} sortOrder={sortOrder} />
        <AddTask />
      </Card>
    </>
  );
};
