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
  status: Task["status"]
): Promise<Task> => {
  const response = await axios.put<Task>(`${TASK_API}/${_id}`, { status });
  return response.data;
};
