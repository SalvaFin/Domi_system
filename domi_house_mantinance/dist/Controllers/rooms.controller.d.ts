import { RoomsService } from '../Services/rooms.service';
import { Room } from '../Entities/room.entity';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    createRoom(roomData: Partial<Room>): Promise<Room>;
    getAllRooms(): Promise<Room[]>;
    getRoomById(id: number): Promise<Room>;
    updateRoom(id: number, updateData: Partial<Room>): Promise<Room>;
    deleteRoom(id: number): Promise<string>;
}
