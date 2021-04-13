import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

import { TaskStatus } from '../task-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.Open, TaskStatus.Done, TaskStatus.InProgress])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
