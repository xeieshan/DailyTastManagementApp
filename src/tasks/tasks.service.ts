import { TaskFilterDto } from './dto/task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entitiy';
import { TasksRepository } from './tasks.repository';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => task.id === id);

  //   if (!task) {
  //     throw new NotFoundException(`Task with ID ${id} not found!`);
  //   }

  //   return task;
  // }

  // filterTasks(taskFilterDto: TaskFilterDto): Task[] {
  //   let tasks = this.getAllTasks();
  //   const { status, search } = taskFilterDto;
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   return tasks;
  // }
  getTasks(filterDto: TaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  // deleteTaskById(id: string) {
  //   const task1 = this.getTaskById(id);
  //   const index = this.tasks.findIndex((task) => task.id === task1.id);
  //   // console.log('delete task by id / index', id, index);
  //   this.tasks.splice(index, 1);
  //   // this.tasks = this.tasks.filter((task) => task.id !== task1.id);
  // }
  async deleteTaskById(id: string): Promise<void> {
    await this.tasksRepository.deleteTaskById(id);
  }

  // updateTaskById(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);

  //   task.status = status;
  //   // task.property = property;
  //   // console.log('delete task by id / index', id, index);
  //   return task;
  // }
  async updateTaskById(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    await this.tasksRepository.save(task);
    return task;
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
}
