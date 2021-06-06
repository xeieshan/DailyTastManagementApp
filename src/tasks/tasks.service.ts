import { TaskFilterDto } from './dto/task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }

    return task;
  }

  filterTasks(taskFilterDto: TaskFilterDto): Task[] {
    let tasks = this.getAllTasks();
    const { status, search } = taskFilterDto;
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }

  deleteTaskById(id: string) {
    const task1 = this.getTaskById(id);
    const index = this.tasks.findIndex((task) => task.id === task1.id);
    // console.log('delete task by id / index', id, index);
    this.tasks.splice(index, 1);
    // this.tasks = this.tasks.filter((task) => task.id !== task1.id);
  }

  updateTaskById(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);

    task.status = status;
    // task.property = property;
    // console.log('delete task by id / index', id, index);
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
