import mongoose, { Schema, Document } from "mongoose";
import { Importance } from "../types/types";

interface TaskType extends Document {
  topic: string;
  description: string;
  status: string;
  importance: Importance;
  file: File[];
  comment: [
    {
      userId: String;
      userName: String;
      text: String;
      timeStamp: Date;
    }
  ];
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
    enum: ["TODO", "IN-PROGRESS", "DONE"],
    default: "TODO",
  },
  importance: {
    type: String,
    enum: ["Urgent", "High", "Lead", "Internal", "Medium", "Low"],
  },
  file: {
    type: [],
    default: null,
  },
  comment: [
    {
      userId: { type: String, required: true },
      userName: { type: String, required: true },
      text: { type: String, required: true },
      timeStamp: { type: Date, default: Date.now },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model<TaskType>("Task", taskSchema);
