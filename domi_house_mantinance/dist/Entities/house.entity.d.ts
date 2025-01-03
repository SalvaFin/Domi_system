import { Room } from './room.entity';
export declare class House {
    id: number;
    name: string;
    street: string;
    city: string;
    postalCode: string;
    floors: number;
    rooms: Room[];
}
