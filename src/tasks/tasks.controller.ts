import { AuthGuard } from '@nestjs/passport';
import {
  Get,
  Put,
  Body,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
  Logger,
} from '@nestjs/common';

import { CreateTaskDto, UpdateTaskDto, GetTaskFilterDto } from './dto';
import { GetUser } from '../auth/get-user.decorator';
import { TaskStatusValidationPipe } from './pipes';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { User } from '../auth/user.entity';
import { Task } from './task.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');

  constructor(private tasksService: TasksService) {}

  @Get()
  index(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User '${user.username} creating task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get(':task_id')
  show(@Param('task_id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete(':task_id')
  destroy(@Param('task_id') id: string, @GetUser() user: User) {
    return this.tasksService.deleteTask(id, user);
  }

  @Put(':task_id')
  update(
    @Param('task_id') id: string,
    @Body() updatedTask: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.updateTask(id, updatedTask, user);
  }

  @Patch(':task_id/status')
  patch(
    @Param('task_id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ) {
    console.log('status wat');

    return this.tasksService.updateTask(id, { status }, user);
  }
}
