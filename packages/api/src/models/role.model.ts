import { User } from "@/models/user.model";
import mongoose from "mongoose";
const { Schema, model, Document } = mongoose;

export enum Role {
  User = "user",
  Mod = "moderator",
  Admin = "admin",
}

export class RoleEntry extends Document {
  user: User;
  role: Role;
}

export const RoleSchema = new Schema<RoleEntry>({
  user: String,
  role: String,
});

export const RoleModel = model<RoleEntry>("User", RoleSchema);
