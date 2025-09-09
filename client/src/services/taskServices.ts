// import type { BackendData } from "@/components/Types/types";
import type { Task } from "@/components/Types/types";
import axios from "axios";

const TASK_API = import.meta.env.VITE_API_TASK;

export const createTask = (data: any) => axios.post(TASK_API, data);

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
