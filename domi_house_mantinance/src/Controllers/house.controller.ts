import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiResponse, ApiParam } from '@nestjs/swagger';
import { HousesService } from '../Services/house.service';
import { House } from '../Entities/house.entity';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Casa creada exitosamente.', type: House })
  createHouse(@Body() houseData: Partial<House>): Promise<House> {
    return this.housesService.createHouse(houseData);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todas las casas.', type: [House] })
  getAllHouses(): Promise<House[]> {
    return this.housesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID de la casa' })
  @ApiResponse({ status: 200, description: 'Detalles de la casa.', type: House })
  @ApiResponse({ status: 404, description: 'Casa no encontrada.' })
  getHouseById(@Param('id') id: number): Promise<House> {
    return this.housesService.findById(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID de la casa' })
  @ApiResponse({ status: 200, description: 'Casa actualizada exitosamente.', type: House })
  updateHouse(@Param('id') id: number, @Body() updateData: Partial<House>): Promise<House> {
    return this.housesService.updateHouse(id, updateData);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID de la casa' })
  @ApiResponse({ status: 200, description: 'Casa eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Casa no encontrada.' })
  deleteHouse(@Param('id') id: number): Promise<string> {
    return this.housesService.deleteHouse(id);
  }
}