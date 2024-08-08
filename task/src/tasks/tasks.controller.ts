import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Guard to protect routes

@Controller('task')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addTask(@Body() body: { title: string; description: string }, @Request() req) {
    return this.tasksService.addTask(req.user.userId, body.title, body.description);
  }
}