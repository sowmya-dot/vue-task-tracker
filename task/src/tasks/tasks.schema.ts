import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
});

export interface Task extends Document {
  userId: string;
  title: string;
  description?: string;
}