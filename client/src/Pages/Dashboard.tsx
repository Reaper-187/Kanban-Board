import { DashboardHeader } from "@/components/Dashboard-Components/D-Header";
import { DashboardNav } from "@/components/Dashboard-Components/D-Nav";
import { TaskContainer } from "@/components/Dashboard-Components/Task-Order/TaskContainer";
import { Card } from "@/components/ui/card";

export const Dashboard = () => {
  return (
    <>
      <Card className="w-full">
        <DashboardHeader />
        <DashboardNav />
        <TaskContainer />
      </Card>
    </>
  );
};
