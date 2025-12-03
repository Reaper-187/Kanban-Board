import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchLogTask, type LogsType } from "@/services/taskServices";

type TaskIdProps = {
  taskId: string;
};

export const ActivityLog = ({ taskId }: TaskIdProps) => {
  const { data: fetchTaskLogs = [] } = useQuery<LogsType[]>({
    queryFn: async () => {
      const data = await fetchLogTask(taskId);

      // damit payload nicht mit "{}" gerendert wird
      const parsedData = data.map((log) => ({
        ...log,
        payload:
          typeof log.payload === "string"
            ? JSON.parse(log.payload)
            : log.payload,
      }));

      const sortedData = parsedData.sort(
        (a, b) =>
          new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
      );
      return sortedData;
    },
    queryKey: ["logs", taskId],
    enabled: !!taskId,
  });

  return (
    <>
      <Card className="h-[650px] flex flex-col">
        <CardHeader>
          <h3 className="text-lg font-semibold">Activity Log</h3>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-5 pr-2">
          {fetchTaskLogs.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Keine Logs vorhanden.
            </p>
          )}

          {fetchTaskLogs.map((log) => (
            <div
              key={`${log._id}-${log.timeStamp}`}
              className="border-b pb-3 mb-3 last:border-none"
            >
              <div className="flex justify-between text-sm font-medium">
                <p>User: {log.userLastName}</p>
                <p>
                  {new Date(log.timeStamp).toLocaleString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="mt-2 text-sm">
                <p className="font-semibold mb-1 text-primary">
                  Action / Changes
                </p>
                <div className="space-y-1">
                  {Object.entries(log.payload).map(
                    ([key, value]: [string, any]) => (
                      <div key={key}>
                        {key}: {value.from} → {value.to}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};
