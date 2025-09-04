import mongoose, { Schema, Document } from "mongoose";
import { Importance } from "../types/types";

interface TaskType extends Document {
  topic: string;
  description: string;
  status: string;
  importance: Importance;
  date: Date;
}

const taskSchema = new Schema<TaskType>({
  topic: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "TODO",
  },
  importance: {
    type: String,
    enum: ["Urgent", "High", "Lead", "Internal", "Medium", "Low"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model<TaskType>("Task", taskSchema);
