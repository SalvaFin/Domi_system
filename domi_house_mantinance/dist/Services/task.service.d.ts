import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../DTOs/create-task';
import { UpdateTaskDto } from '../DTOs/update-task';
export declare class TaskService implements OnModuleInit {
    private readonly taskRepository;
    private scheduledTasks;
    constructor(taskRepository: Repository<Task>);
    onModuleInit(): Promise<void>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: string): Promise<void>;
    private scheduleTask;
    private parseISO8601Duration;
    private handleTaskCompletion;
    findAll(): Promise<Task[]>;
    findOne(id: string): Promise<Task | null>;
    finishTask(taskId: string): Promise<void>;
    scheduleNextRecurrence(task: Task): Promise<void>;
}
