import { AddTask } from "@/components/Add-Task/AddTask";
import { DashboardHeader } from "@/components/Dashboard-Components/D-Header";
import { DashboardNav } from "@/components/Dashboard-Components/D-Nav";
import { TaskContainer } from "@/components/Dashboard-Components/Task-Order/TaskContainer";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export const Dashboard = () => {
  const [filterStauts, setFilterStatus] = useState<string>("");

  return (
    <>
      <Card className="w-full">
        <DashboardHeader />
        <DashboardNav filter={setFilterStatus} />
        <TaskContainer filtertrigger={filterStauts} />
        <AddTask />
      </Card>
    </>
  );
};
