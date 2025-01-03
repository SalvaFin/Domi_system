import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from './Entities/room.entity';
import { RoomsController } from './Controllers/rooms.controller';
import { RoomsService } from './Services/rooms.service';

import { Task } from './Entities/task.entity';
import { TaskController } from './Controllers/task.controller';
import { TaskService } from './Services/task.service';

import { House } from './Entities/house.entity';
import { HousesController } from './Controllers/house.controller';
import { HousesService } from './Services/house.service';

import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '123',
      database: 'Domi',
      entities: [Room, House, Task], // Importa la entidad aquí
      synchronize: false, // Crear tablas automáticamente en desarrollo
      extra: {
        trustServerCertificate: true,
      },
      options: {
        useUTC: true, // Asegura que las fechas se interpreten como UTC
      },
    }),
    TypeOrmModule.forFeature([Room, House, Task]), // Importa Room para usarlo en providers
    ScheduleModule.forRoot(), // Habilitamos el módulo de programación

  ],
  controllers: [RoomsController, HousesController, TaskController],
  providers: [RoomsService, HousesService, TaskService],
  exports: [RoomsService, HousesService, TaskService],
})
export class AppModule {}
