import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, GetTaskFilterDto } from './dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepo: TaskRepository,
  ) {}

  getTasks(filterDto: GetTaskFilterDto, user: User) {
    return this.taskRepo.getTasks(filterDto, user);
  }

  async createTask(taskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepo.create({ ...taskDto, user }).save();
  }
  async getTaskById(taskId: string, user: User): Promise<Task> {
    return this.taskRepo
      .findOneOrFail({ where: { id: taskId, userId: user.id } })
      .catch(() => {
        throw new NotFoundException(`Task with ID '${taskId}' not found`);
      });
  }

  async deleteTask(taskId: string, user: User): Promise<DeleteResult> {
    return this.taskRepo
      .delete({ id: taskId, userId: user.id })
      .then((result) => {
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID '${taskId}' not found`);
        }

        return result;
      });
  }
  async updateTask(
    taskId: string,
    updatedTask: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    return this.getTaskById(taskId, user).then((task) =>
      this.taskRepo.save({ ...task, ...updatedTask }),
    );
  }
}
