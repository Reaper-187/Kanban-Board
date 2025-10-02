import { AddTask } from "@/components/Add-Task/AddTask";
import { DeleteAlert } from "@/components/Alert-Comp/DeleteAlert";
import { DashboardHeader } from "@/components/Dashboard-Components/D-Header";
import { DashboardNav } from "@/components/Dashboard-Components/D-Nav";
import { TaskContainer } from "@/components/Dashboard-Components/Task-Order/TaskContainer";
import type { ImportanceFilter, SortOrder } from "@/components/Types/types";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export const Dashboard = () => {
  const [viewType, setViewType] = useState<string>("table");

  const [filterStauts, setFilterStatus] = useState<string>("");

  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  const [importanceFilter, setImportanceFilter] = useState<ImportanceFilter[]>(
    []
  );

  return (
    <>
      <Card className="w-full">
        <DashboardHeader toggleView={setViewType} />
        <DashboardNav
          filter={setFilterStatus}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          importanceFilter={importanceFilter}
          setImportanceFilter={setImportanceFilter}
        />

        <TaskContainer
          viewType={viewType}
          filtertrigger={filterStauts}
          sortOrder={sortOrder}
          singleFilter={importanceFilter}
        />

        <AddTask />
        <DeleteAlert />
      </Card>
    </>
  );
};
