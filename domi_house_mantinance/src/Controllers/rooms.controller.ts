import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RoomsService } from '../Services/rooms.service';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Room } from '../Entities/room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // Crear una habitación
  @Post()
  @ApiResponse({ status: 201, description: 'Habitacion creada exitosamente.', type: Room })  
  createRoom(@Body() roomData: Partial<Room>) {
    return this.roomsService.createRoom(roomData);
  }

  // Obtener todas las habitaciones
  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todas las habitaciones.', type: [Room] })  
  getAllRooms() {
    return this.roomsService.findAll();
  }

  // Obtener una habitación por ID
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID de la habitacion' })
  @ApiResponse({ status: 200, description: 'Get Habitacion por ID.', type: Room })  
  @ApiResponse({ status: 404, description: 'Habitación no encontrada.' })
  getRoomById(@Param('id') id: number) {
    return this.roomsService.findById(id);
  }

  // Actualizar una habitación
  @Put(':id') // PUT /rooms/:id
  @ApiParam({ name: 'id', description: 'ID de la habitacion' })
  @ApiResponse({ status: 200, description: 'Habitacion actualizada correctamente.', type: Room })  
  updateRoom(@Param('id') id: number, @Body() updateData: Partial<Room>) {
    return this.roomsService.updateRoom(Number(id), updateData);
  }

  // Eliminar una habitación
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID de la Habitacion' })
  @ApiResponse({ status: 200, description: 'Habitacion eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Habitacion no encontrada.' })
  deleteRoom(@Param('id') id: number) {
    return this.roomsService.deleteRoom(Number(id));
  }
}