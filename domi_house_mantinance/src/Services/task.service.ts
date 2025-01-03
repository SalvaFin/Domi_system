import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../DTOs/create-task';
import { UpdateTaskDto } from '../DTOs/update-task';
import {TaskType} from '../Enums/task-type.enum';


@Injectable()
export class TaskService implements OnModuleInit {
  private scheduledTasks: Record<string, NodeJS.Timeout> = {};

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async onModuleInit() {
    const tasks = await this.taskRepository.find({
      where: { isActive: true, isCompleted: false },
    });

    tasks.forEach((task) => {
      if (task.endTime && new Date(task.endTime) > new Date()) {
        this.scheduleTask(task);
      }
    });

    console.log('Tareas reprogramadas al iniciar el servidor');
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const now = new Date();
    const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    const task = this.taskRepository.create({
      ...createTaskDto,
      startTime: localISOTime,
      endTime: new Date(createTaskDto.endTime),
    });

    const savedTask = await this.taskRepository.save(task);

    if (savedTask.endTime && savedTask.isActive) {
      this.scheduleTask(savedTask);
    }

    return savedTask;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    const updatedTask = await this.findOne(id);

    if (updatedTask && updatedTask.endTime && updatedTask.isActive) {
      this.scheduleTask(updatedTask);
    }

    return updatedTask;
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);

    if (this.scheduledTasks[id]) {
      clearTimeout(this.scheduledTasks[id]);
      delete this.scheduledTasks[id];
    }
  }

  private scheduleTask(task: Task) {
    const now = new Date();
    const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    const taskEndTime = new Date(task.endTime);

    if (this.scheduledTasks[task.id]) {
      clearTimeout(this.scheduledTasks[task.id]);
    }

    if (taskEndTime > now) {
        const delay = taskEndTime.getTime() - localISOTime.getTime();

      this.scheduledTasks[task.id] = setTimeout(() => {
        console.log(`Tarea "${task.name}" ejecutada a las: ${new Date().toISOString()}`);
        this.handleTaskCompletion(task);
      }, delay);
    } else {
      console.log(`La tarea "${task.name}" tiene un tiempo pasado. No se programará.`);
    }
  }

  private parseISO8601Duration(duration: string): number | null {
    const match = duration.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) {
      return null;
    }

    const [, days, hours, minutes, seconds] = match.map((value) => parseInt(value, 10) || 0);
    return (
      days * 24 * 60 * 60 * 1000 +
      hours * 60 * 60 * 1000 +
      minutes * 60 * 1000 +
      seconds * 1000
    );
  }

  private async handleTaskCompletion(task: Task) {
    const updatedTask = await this.findOne(task.id);
    if (!updatedTask) {
      console.log(`No se encontró la tarea con ID "${task.id}".`);
      return;
    }
  
    updatedTask.isCompleted = true;
  
    switch (updatedTask.type) {
      case TaskType.ALARM:
      case TaskType.TIMER:
        updatedTask.isActive = true;
        await this.taskRepository.save(updatedTask);
        console.log(`La tarea "${updatedTask.name}" está sonando o requiere acción.`);
        //TODO IMPLEMENTAR COMUNICACION CON FRONT PARA SONAR LA ALARMA O EL TEMPORIZADOR
        break;
  
      case TaskType.CLEANING:
      case TaskType.REMINDER:
        updatedTask.isActive = true;
        await this.taskRepository.save(updatedTask);
        console.log(`La tarea "${updatedTask.name}" requiere atención (limpieza o recordatorio).`);
        break;
  
      case TaskType.OTHER:
      default:
        updatedTask.isActive = false;
        await this.taskRepository.save(updatedTask);
        console.log(`La tarea "${updatedTask.name}" marcada como completada.`);
        break;
    }
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task | null> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async finishTask(taskId: string): Promise<void> {  
      const task = await this.findOne(taskId);
      if (task) {
        task.isCompleted = true;
        task.isActive = false;
        await this.taskRepository.save(task);
        console.log(`Tarea "${task.name}" marcada como completada.`);
      }
  }

  public async scheduleNextRecurrence(task: Task) {
    if (task.recurrence) {
      const recurrenceInterval = this.parseISO8601Duration(task.recurrence);
      if (recurrenceInterval) {
        const nextEndTime = new Date(new Date().getTime() + recurrenceInterval);
  
        const newTask = this.taskRepository.create({
          ...task,
          id: undefined, // Generar un nuevo ID
          startTime: new Date(),
          endTime: nextEndTime,
          isCompleted: false,
          isActive: true,
        });
  
        await this.taskRepository.save(newTask);
        console.log(`La próxima instancia de la tarea "${task.name}" se ha programado para ${nextEndTime}.`);
        this.scheduleTask(newTask); // Programar la nueva tarea
      }
    }
  }
}
