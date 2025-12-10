import mongoose, { Schema, Document } from "mongoose";

type AuthProvider = "google" | "github";

type UserRole = "admin" | "user";

interface SocialUserType extends Document {
  provider: AuthProvider;
  userRole: UserRole;
  providerId: string;
  name: string;
  email: string;
  avatar?: string;
  createdOn: Date;
}

const socialUserSchema = new Schema<SocialUserType>({
  provider: { type: String, required: true, enum: ["google", "github"] },
  userRole: { type: String, default: "user" },
  providerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model<SocialUserType>("SocialUser", socialUserSchema);
