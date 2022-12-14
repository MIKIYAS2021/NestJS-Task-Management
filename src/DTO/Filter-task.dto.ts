import { IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks/task.model';
export class FilterTaskDTO{
    @IsOptional()
    @IsIn([TaskStatus.DONE,TaskStatus.IN_PROGRESS,TaskStatus.OPEN])
    status: TaskStatus;
    @IsOptional()
    search: string;
}