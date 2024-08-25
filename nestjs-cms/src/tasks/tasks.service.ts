import { Injectable } from '@nestjs/common';

import { TasksModel } from './tasks.model.ts';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: TasksModel[] = [
    { id: '1', title: 'task1', description: 'blablabla', author: 'oleg' },
    { id: '2', title: 'task2', description: 'drudrudru', author: 'gleb' },
    { id: '3', title: 'task3', description: 'crycrycry', author: 'boris' },
  ];

  public findAll(): TasksModel[] {
    return this.tasks;
  }

  public findById(id: string): TasksModel | null {
    if (this.findIndex(id) === -1) return null;
    return this.tasks[this.findIndex(id)];
  }

  public create(createTask: CreateTasksDto): void {
    this.tasks.push({ id: uuidv4(), ...createTask });
  }

  public update(id: string, updateTask: UpdateTasksDto): boolean {
    if (this.findIndex(id) === -1) return false;
    this.tasks[this.findIndex(id)] = {
      ...this.tasks[this.findIndex(id)],
      ...updateTask,
    };
    return true;
  }

  public delete(id: string): boolean {
    if (this.findIndex(id) === -1) return false;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return true;
  }

  public changeAuthor(id: string, author: string): TasksModel | null {
    if (this.findIndex(id) === -1) return null;
    this.tasks[this.findIndex(id)] = {
      ...this.tasks[this.findIndex(id)],
      author,
    };
    return this.tasks[this.findIndex(id)];
  }

  private findIndex(id: string): number {
    return this.tasks.findIndex((task) => task.id === id);
  }
}
