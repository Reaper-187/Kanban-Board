import mongoose, { Schema, Document } from "mongoose";

type UserRole = "Admin" | "Regular-User" | "Guest";

interface UserType extends Document {
  userRole: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  veryfication: boolean;
  veryficationToken: string;
  createdOn: Date;
  tokenExp: Date;
  otpNum: number;
  blockedAccount: boolean;
  restCodeExp: Date;
}

const userSchema = new Schema<UserType>({
  userRole: {
    type: String,
    default: "Regular-User",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  veryfication: {
    type: Boolean,
    default: false,
  },
  veryficationToken: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  tokenExp: {
    type: Date,
  },
  otpNum: {
    type: Number,
  },
  blockedAccount: {
    type: Boolean,
    default: false,
  },
  restCodeExp: {
    type: Date,
  },
});

module.exports = mongoose.model<UserType>("User", userSchema);
