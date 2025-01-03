import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { RoomType } from '../Enums/room-type.enum';
import { House } from './house.entity';
import { Task } from './task.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity('rooms') // Tabla "rooms" en la base de datos
export class Room {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único de la habitación' })
  id: number;

  @Column({ length: 255 })
  @ApiProperty({ description: 'Nombre de la habitación' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Tamaño de la habitación' })
  size: number;

  @Column({
    type: 'int',                // Tipo numérico en la base de datos
    enum: RoomType,             // Enum numérico
    default: RoomType.OTHER,    // Valor por defecto
  })
  @ApiProperty({ description: 'Tipo de la habitación' })
  type: RoomType;

  @Column({ default: true })
  @ApiProperty({ description: 'Habitacion usable' })
  isAvailable: boolean;

  @Column()
  @ApiProperty({ description: 'Piso de la habitación' })
  floor: string; // Piso en el que está la habitación

  @ManyToOne(() => House, (house) => house.rooms, { onDelete: 'CASCADE' }) // Relación con House
  @ApiProperty({ description: 'Casa de la habitación' })
  house: House;

  // Añadir relación en Room
  @OneToMany(() => Task, (task) => task.room)
  @ApiProperty({ description: 'Tareas asociadas a la habitación', type: () => [Task] })
  tasks: Task[];
}