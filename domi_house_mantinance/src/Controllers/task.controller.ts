import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiParam } from '@nestjs/swagger';

import { TaskService } from '../Services/task.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../DTOs/create-task';
import { UpdateTaskDto } from '../DTOs/update-task';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Task creada exitosamente.', type: CreateTaskDto })  
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.create(createTaskDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.taskService.remove(id);
  }

  @Post('finish-task/:id')
  async finishTask(@Param('id') id: string): Promise<{ message: string }> {
    const task = await this.taskService.findOne(id);
    if (!task) {
      console.error(`No se ha encontrado la tarea con el Id: ${id}`)
    }
  
    task.isActive = false;
    this.taskService.finishTask(task.id);
  
    if (task.recurrence) {
      await this.taskService.scheduleNextRecurrence(task);
    }
  
    return { message: `La tarea "${task.name}" ha sido finalizada.` };
  }
}