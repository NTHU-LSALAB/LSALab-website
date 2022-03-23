import mongoose from "mongoose";
const { Schema, model, Document } = mongoose;
import { Role } from "./role.model";

export class User extends Document {
  username: string;
  email: string;
  password: string;
  googleRefreshToken?: string;
  // roles?: Role[];
}

export const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    googleRefreshToken: String,
    // roles: { type: [Role], default: [Role.User], required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>("User", UserSchema);
