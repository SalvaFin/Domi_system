import { Repository } from 'typeorm';
import { House } from '../Entities/house.entity';
export declare class HousesService {
    private readonly houseRepository;
    constructor(houseRepository: Repository<House>);
    createHouse(houseData: Partial<House>): Promise<House>;
    findAll(): Promise<House[]>;
    findById(id: number): Promise<House>;
    updateHouse(id: number, updateData: Partial<House>): Promise<House>;
    deleteHouse(id: number): Promise<string>;
}
