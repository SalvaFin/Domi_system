import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}