import { TaskType } from '../enums/task-type.enum';
export declare class CreateTaskDto {
    name: string;
    description?: string;
    endTime?: Date;
    type?: TaskType;
    recurrence?: string;
    isCompleted?: boolean;
    isActive?: boolean;
    roomId?: string;
}
