import { HousesService } from '../Services/house.service';
import { House } from '../Entities/house.entity';
export declare class HousesController {
    private readonly housesService;
    constructor(housesService: HousesService);
    createHouse(houseData: Partial<House>): Promise<House>;
    getAllHouses(): Promise<House[]>;
    getHouseById(id: number): Promise<House>;
    updateHouse(id: number, updateData: Partial<House>): Promise<House>;
    deleteHouse(id: number): Promise<string>;
}
