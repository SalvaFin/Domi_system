import { TaskService } from '../Services/task.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../DTOs/create-task';
import { UpdateTaskDto } from '../DTOs/update-task';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findAll(): Promise<Task[]>;
    findOne(id: string): Promise<Task>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: string): Promise<void>;
    finishTask(id: string): Promise<{
        message: string;
    }>;
}
