import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Room } from './room.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('houses') // Tabla en la base de datos
export class House {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único de la casa' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nombre de la casa' })
  name: string; // Nombre

  @Column()
  @ApiProperty({ description: 'Calle donde se encuentra la casa' })
  street: string; // Calle

  @Column()
  @ApiProperty({ description: 'Ciudad donde se encuentra la casa' })
  city: string; // Ciudad

  @Column()
  @ApiProperty({ description: 'Código postal de la casa' })
  postalCode: string; // Código postal

  @Column()
  @ApiProperty({ description: 'Número de pisos que tiene la casa' })
  floors: number; // Número de pisos

  @OneToMany(() => Room, (room) => room.house) // Relación con Room
  @ApiProperty({ description: 'Habitaciones asociadas a la casa', type: () => [Room] })
  rooms: Room[];
}