import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Room } from './room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TaskType } from '../Enums/task-type.enum';

@Entity('tasks') // Tabla "tasks" en la base de datos
export class Task {
    @PrimaryGeneratedColumn('uuid') // Genera un GUID como ID
    @ApiProperty({ description: 'ID único de la tarea en formato GUID' })
    id: string;

  @Column({ length: 255 })
  @ApiProperty({ description: 'Nombre de la tarea' })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Descripción de la tarea' })
  description: string;

  @Column({ type: 'datetime2', nullable: true })
  @ApiProperty({ description: 'Hora de inicio de la tarea' })
  startTime: Date;

  @Column({ type: 'datetime2', nullable: true })
  @ApiProperty({ description: 'Hora de finalización de la tarea' })
  endTime: Date;

  @Column({
    type: 'int',
    enum: TaskType,
    default: TaskType.OTHER,
  })
  @ApiProperty({
    description: 'Tipo de tarea',
    enum: TaskType,
    enumName: 'TaskType',
  })
  type: TaskType;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: 'Periodicidad de la tarea en formato ISO 8601' })
  recurrence: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Indica si la tarea ha sido completada' })
  isCompleted: boolean;

  @Column({ type: 'int', default: false })
  @ApiProperty({ description: 'Indica si la tarea está activa' })
  isActive: boolean;

  @ManyToOne(() => Room, (room) => room.tasks, { onDelete: 'SET NULL' }) // Relación con Room
  @ApiProperty({ description: 'Habitación asociada a la tarea', type: () => Room })
  room: Room;
}