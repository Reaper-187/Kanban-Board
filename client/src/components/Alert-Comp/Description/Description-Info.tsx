import type { Task } from "@/components/Types/types";
import { DownloadIcon } from "lucide-react";
import { CommentSection } from "./Comment-Comp/CommentSection";

type DescriptionInfosProps = {
  currentTask: Task;
};

export const DescriptionInfos = ({ currentTask }: DescriptionInfosProps) => {
  return (
    <div className="space-y-1 ">
      <div className="flex gap-3">
        <p className="text-md md:text-lg font-semibold">Description:</p>
        <p className="text-sm md:text-md text-secondary-foreground flex self-center">
          {currentTask.description}
        </p>
      </div>
      <p className="w-full bg-gray-300 h-[1px]"></p>
      <div>
        <div className="grid grid-col-2 mb-2">
          <div>
            <div className="flex items-center">
              <p className="text-md md:text-lg font-semibold">Attachment</p>
              <p className="text-sm md:text-md p-2 rounded-m bg-grey-300">
                {currentTask.file?.length ? currentTask.file?.length + " " : 0}
                file
              </p>
            </div>
            <p className="w-full bg-gray-300 h-[1px] mb-2"></p>
            <div>
              {currentTask?.file &&
                currentTask?.file.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center justify-between text-sm bg-secondary text-secondary-foreground p-2 my-1 rounded-md space-x-2"
                  >
                    <p className="truncate">{f.name}</p>
                    <a
                      key={f.path}
                      target="_blank"
                      href={import.meta.env.VITE_API_STATIC + f.path}
                    >
                      <DownloadIcon
                        className={
                          "scale-90 hover:scale-110 transition druation-300"
                        }
                      />
                    </a>
                  </li>
                ))}
            </div>
          </div>
        </div>
        <div>
          <CommentSection taskId={currentTask._id} />
        </div>
      </div>
    </div>
  );
};
