import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ActivityLog = ({ taskId }: any) => {
  return (
    <>
      <Card>
        <CardHeader>ActivityLog</CardHeader>
        <CardContent>
          <div>
            <div className="flex gap-3 text-xs">
              <p>UserName:</p>
              <p>TimeStamp:</p>
            </div>
            <div className="flex gap-3">
              <p>Action:</p>
              <p>Description...</p>
            </div>
            <p className="border-b-1 border-b-forderground"></p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
