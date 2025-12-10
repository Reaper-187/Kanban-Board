import mongoose, { Schema, Document } from "mongoose";

interface AcitivityLogTypes extends Document {
  taskId: string;
  userId: string;
  lastName: string;
  timeStamp: Date;
  payload: Object;
}

const ActivityLogsScheam = new Schema<AcitivityLogTypes>({
  taskId: {
    type: String,
  },
  userId: {
    type: String,
  },
  lastName: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  payload: { type: Object },
});

module.exports = mongoose.model<AcitivityLogTypes>("Logs", ActivityLogsScheam);
