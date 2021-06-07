import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entitiy';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(@Query() taskFilterDto: TaskFilterDto): Task[] {
  //   if (Object.keys(taskFilterDto).length > 0) {
  //     return this.tasksService.filterTasks(taskFilterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }
  @Get('')
  getTasks(@Query() filterDto: TaskFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string) {
  //   return this.tasksService.deleteTaskById(id);
  // }
  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void> {
    return await this.tasksService.deleteTaskById(id);
  }

  // @Patch('/:id/status')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ) {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskById(id, status);
  // }
  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskById(id, status);
  }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
}
