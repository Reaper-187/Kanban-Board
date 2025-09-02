// import type { BackendData } from "@/components/Types/types";
import axios from "axios";

const ADD_TASK_API = import.meta.env.VITE_API_ADDTASK;

export const createTask = (data: any) => axios.post(ADD_TASK_API, data);
