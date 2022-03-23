import mongoose from "mongoose";
const { Schema, model, Document } = mongoose;

export class Doc extends Document {
  tag: string;
  type: string;
  title: string;
  link: string;
  ranking?: string;
  deadline?: string;
}

export const DocSchema = new Schema<Doc>(
  {
    tag: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    ranking: { type: String, required: false },
    deadline: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const DocModel = model<Doc>("Doc", DocSchema);
