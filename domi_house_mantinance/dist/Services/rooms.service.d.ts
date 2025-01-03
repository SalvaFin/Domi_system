import { Repository } from 'typeorm';
import { Room } from '../Entities/room.entity';
import { HousesService } from './house.service';
export declare class RoomsService {
    private readonly roomRepository;
    private readonly housesService;
    constructor(roomRepository: Repository<Room>, housesService: HousesService);
    createRoom(room: Partial<Room>): Promise<Room>;
    findAll(): Promise<Room[]>;
    findById(id: number): Promise<Room>;
    updateRoom(id: number, updateData: Partial<Room>): Promise<Room>;
    deleteRoom(id: number): Promise<string>;
}
