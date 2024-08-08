import { Injectable } from '@nestjs/common';
import { Task, TaskDocument } from './task.schema'; // Task schema for MongoDB
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getTasks(userId: string) {
    return this.taskModel.find({ userId }).exec();
  }

  async addTask(userId: string, title: string, description: string) {
    const task = new this.taskModel({ userId, title, description });
    return task.save();
  }
}