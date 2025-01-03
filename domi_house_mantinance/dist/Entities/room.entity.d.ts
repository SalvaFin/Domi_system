import { RoomType } from '../Enums/room-type.enum';
import { House } from './house.entity';
import { Task } from './task.entity';
export declare class Room {
    id: number;
    name: string;
    size: number;
    type: RoomType;
    isAvailable: boolean;
    floor: string;
    house: House;
    tasks: Task[];
}
