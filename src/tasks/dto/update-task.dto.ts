import { TaskStatus } from '../task-status.enum';
import { Task } from '../task.entity';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto implements Partial<Omit<Task, 'id'>> {
  @IsOptional()
  title?: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  status: TaskStatus;
}
