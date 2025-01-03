import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../Entities/room.entity';
import { RoomType } from '../Enums/room-type.enum';
import { HousesService } from './house.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly housesService: HousesService, // Inyectamos HousesService
  ) {}

  // Crear una habitación
  async createRoom(room: Partial<Room>): Promise<Room> {
    // Find the house by houseId
    const house = await this.housesService.findById(room.house.id);
    if (!house) {
      throw new NotFoundException(`House with ID ${room.house.id} not found.`);
    }
  
    // Create the room and associate it with the house
    const newRoom = this.roomRepository.create({
      ...room,
      house, // Associate the house
    });
  
    // Save the room in the database
    return await this.roomRepository.save(newRoom);
  }

  // Obtener todas las habitaciones
  findAll(): Promise<Room[]> {
    return this.roomRepository.find({
      relations: ['house'], // Incluye la casa asociada
    });
  }

  // Obtener una habitación por ID
  async findById(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['house'], // Incluye la casa asociada
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found.`);
    }

    return room;
  }

  // Actualizar una habitación completamente
  async updateRoom(id: number, updateData: Partial<Room>): Promise<Room> {
    const room = await this.findById(id); // Verifica si la habitación existe
    Object.assign(room, updateData); // Actualiza las propiedades
    return await this.roomRepository.save(room); // Guarda los cambios
  }

  // Eliminar una habitación
  async deleteRoom(id: number): Promise<string> {
    const result = await this.roomRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Room with ID ${id} not found.`);
    }

    return `Room with ID ${id} has been deleted successfully.`;
  }
}