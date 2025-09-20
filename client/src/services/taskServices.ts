// import type { BackendData } from "@/components/Types/types";
import type { Task, RequestData } from "@/components/Types/types";
import axios from "axios";

const TASK_API = import.meta.env.VITE_API_TASK;

export const createTask = async (data: RequestData): Promise<RequestData> => {
  const response = await axios.post<RequestData>(TASK_API, data);
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
  const response = await axios.patch<Task>(`${TASK_API}/${_id}`, updates);
  return response.data;
};

export const deleteTask = async (_id: string): Promise<Task> => {
  const response = await axios.delete<Task>(`${TASK_API}/${_id}`);
  return response.data;
};
