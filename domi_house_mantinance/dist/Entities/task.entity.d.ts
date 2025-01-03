import { Room } from './room.entity';
import { TaskType } from '../Enums/task-type.enum';
export declare class Task {
    id: string;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    type: TaskType;
    recurrence: string;
    isCompleted: boolean;
    isActive: boolean;
    room: Room;
}
