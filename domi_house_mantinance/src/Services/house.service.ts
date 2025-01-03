import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from '../Entities/house.entity';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  // Crear una nueva casa
  async createHouse(houseData: Partial<House>): Promise<House> {
    const newHouse = this.houseRepository.create(houseData);
    return this.houseRepository.save(newHouse);
  }

  // Obtener todas las casas
  async findAll(): Promise<House[]> {
    return this.houseRepository.find({ relations: ['rooms'] }); // Incluye las habitaciones
  }

  // Obtener una casa por ID
  async findById(id: number): Promise<House> {
    const house = await this.houseRepository.findOne({
      where: { id },
      relations: ['rooms'], // Incluye habitaciones asociadas
    });

    if (!house) {
      throw new NotFoundException(`House with ID ${id} not found.`);
    }
    return house;
  }

  // Actualizar una casa completamente
  async updateHouse(id: number, updateData: Partial<House>): Promise<House> {
    const house = await this.findById(id); // Verifica si la casa existe

    Object.assign(house, updateData); // Actualiza las propiedades
    return this.houseRepository.save(house); // Guarda los cambios
  }

  // Eliminar una casa
  async deleteHouse(id: number): Promise<string> {
    const result = await this.houseRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`House with ID ${id} not found.`);
    }

    return `House with ID ${id} has been deleted successfully.`;
  }
}