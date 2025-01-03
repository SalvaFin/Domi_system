import { IsEnum, IsOptional, IsString, IsBoolean, IsDate, IsUUID } from 'class-validator';
import { TaskType } from '../enums/task-type.enum';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  endTime?: Date;

  @IsEnum(TaskType)
  @IsOptional()
  type?: TaskType;

  @IsString()
  @IsOptional()
  recurrence?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsUUID()
  @IsOptional()
  roomId?: string; // UUID de la habitación asociada
}