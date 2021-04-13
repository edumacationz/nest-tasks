import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = [
    TaskStatus.Open,
    TaskStatus.InProgress,
    TaskStatus.Done,
  ];

  transform(value: TaskStatus) {
    const status = (value.toUpperCase() as string) as TaskStatus;

    if (!this.isValidStatus(status)) {
      throw new BadRequestException(`'${status}' is an invalid status`);
    }

    return status;
  }

  private isValidStatus(status: any): boolean {
    return this.allowedStatuses.includes(status);
  }
}
