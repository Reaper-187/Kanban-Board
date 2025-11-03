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
      formData.append("file", file);
    });
  }

  const response = await axios.post<RequestData>(TASK_API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  console.log("response", response);

  return response.data;
};

export const fetchTask = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(TASK_API);
  return response.data;
};

type CommentType = {
  _id: string;
  userName: string;
  text: string;
  timeStamp: Date;
};

export const fetchCommentTask = async (_id: string): Promise<CommentType[]> => {
  const response = await axios.get<CommentType[]>(`${TASK_API}/${_id}`);
  return response.data;
};

export const createCommentTask = async (
  _id: string,
  comment: { text: string }
): Promise<Task> => {
  const response = await axios.post<Task>(`${TASK_API}/${_id}`, comment);
  console.log(response);
  return response.data;
};

export const updateTask = async (
  _id: string,
  updates: Partial<Task>
): Promise<Task> => {
  const formData = new FormData();

  if (updates.topic) formData.append("topic", updates.topic);
  if (updates.description) formData.append("description", updates.description);
  if (updates.importance) formData.append("importance", updates.importance);
  if (updates.status) formData.append("status", updates.status);
  if (updates.date) formData.append("date", updates.date.toString());

  updates.newFiles?.forEach((file) => {
    formData.append("newFiles", file);
  });

  const response = await axios.patch<Task>(`${TASK_API}/${_id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

type DeletePayload = { _id: string[] };

export const deleteTask = async (_id: DeletePayload): Promise<Task> => {
  const response = await axios.delete<Task>(TASK_API, { data: _id });
  return response.data;
};
