import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { SuccessMessage } from '../types';
import { TasksModel } from './tasks.model.ts';
import { UpdateTasksDto } from './dto/update-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  public createTask(@Body() createTaskDto: CreateTasksDto): SuccessMessage {
    this.taskService.create(createTaskDto);
    return { message: 'Task created!' };
  }

  @Delete(':id')
  public deleteTask(@Param('id') id: string): SuccessMessage {
    const task = this.taskService.delete(id);
    if (!task) throw new NotFoundException('Task not found');
    return { message: 'Task deleted successfully' };
  }

  @Get(':id')
  public getTaskById(@Param('id') id: string): TasksModel {
    const task = this.taskService.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Put(':id')
  public updateTask(
    @Param('id') id: string,
    @Body() updateTask: UpdateTasksDto,
  ): SuccessMessage {
    const task = this.taskService.update(id, updateTask);
    if (!task) throw new NotFoundException('Task not found');
    return { message: 'Task updated!' };
  }

  @Get()
  public getTasks(): TasksModel[] {
    return this.taskService.findAll();
  }
}
