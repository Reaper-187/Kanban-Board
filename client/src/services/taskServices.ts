// import type { BackendData } from "@/components/Types/types";
import type { Task, RequestData } from "@/components/Types/types";
import axios from "axios";

const TASK_API = import.meta.env.VITE_API_TASK;

export const createTask = async (data: RequestData): Promise<RequestData> => {
  const formData = new FormData();

  formData.append("topic", data.topic);
  formData.append("description", data.description);
  formData.append("importance", data.importance || "Medium");
  formData.append("date", data.date ? data.date.toString() : "");

  if (data.file && data.file.length > 0) {
    data.file.forEach((file) => {
      if (file instanceof File) {
        formData.append("file", file);
      }
    });
  }

  const response = await axios.post<RequestData>(TASK_API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const fetchTask = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(TASK_API);
  return response.data;
};

export const updateTask = async (
  _id: string,
  updates: Partial<Task>
): Promise<Task> => {
  let payload: any = updates;
  let headers: Record<string, string> = {};

  if (updates.file && updates.file.some((f) => f instanceof File)) {
    const formData = new FormData();

    if (updates.topic) formData.append("topic", updates.topic);
    if (updates.description)
      formData.append("description", updates.description);
    if (updates.importance) formData.append("importance", updates.importance);
    if (updates.status) formData.append("status", updates.status);
    if (updates.date) formData.append("date", updates.date.toString());

    updates.file.forEach((f) => {
      if (f instanceof File) {
        formData.append("file", f);
      }
    });

    payload = formData;
    headers["Content-Type"] = "multipart/form-data";
  }

  const response = await axios.patch<Task>(`${TASK_API}/${_id}`, payload, {
    headers,
  });

  return response.data;
};

export const deleteTask = async (_id: string): Promise<Task> => {
  const response = await axios.delete<Task>(`${TASK_API}/${_id}`);
  return response.data;
};

// Delete Fetches prüfen weil Type Taks auf File[] erweitert wurde.
