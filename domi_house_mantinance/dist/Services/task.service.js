"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
const task_type_enum_1 = require("../Enums/task-type.enum");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
        this.scheduledTasks = {};
    }
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
    async create(createTaskDto) {
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
    async update(id, updateTaskDto) {
        await this.taskRepository.update(id, updateTaskDto);
        const updatedTask = await this.findOne(id);
        if (updatedTask && updatedTask.endTime && updatedTask.isActive) {
            this.scheduleTask(updatedTask);
        }
        return updatedTask;
    }
    async remove(id) {
        await this.taskRepository.delete(id);
        if (this.scheduledTasks[id]) {
            clearTimeout(this.scheduledTasks[id]);
            delete this.scheduledTasks[id];
        }
    }
    scheduleTask(task) {
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
        }
        else {
            console.log(`La tarea "${task.name}" tiene un tiempo pasado. No se programará.`);
        }
    }
    parseISO8601Duration(duration) {
        const match = duration.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match) {
            return null;
        }
        const [, days, hours, minutes, seconds] = match.map((value) => parseInt(value, 10) || 0);
        return (days * 24 * 60 * 60 * 1000 +
            hours * 60 * 60 * 1000 +
            minutes * 60 * 1000 +
            seconds * 1000);
    }
    async handleTaskCompletion(task) {
        const updatedTask = await this.findOne(task.id);
        if (!updatedTask) {
            console.log(`No se encontró la tarea con ID "${task.id}".`);
            return;
        }
        updatedTask.isCompleted = true;
        switch (updatedTask.type) {
            case task_type_enum_1.TaskType.ALARM:
            case task_type_enum_1.TaskType.TIMER:
                updatedTask.isActive = true;
                await this.taskRepository.save(updatedTask);
                console.log(`La tarea "${updatedTask.name}" está sonando o requiere acción.`);
                break;
            case task_type_enum_1.TaskType.CLEANING:
            case task_type_enum_1.TaskType.REMINDER:
                updatedTask.isActive = true;
                await this.taskRepository.save(updatedTask);
                console.log(`La tarea "${updatedTask.name}" requiere atención (limpieza o recordatorio).`);
                break;
            case task_type_enum_1.TaskType.OTHER:
            default:
                updatedTask.isActive = false;
                await this.taskRepository.save(updatedTask);
                console.log(`La tarea "${updatedTask.name}" marcada como completada.`);
                break;
        }
    }
    async findAll() {
        return await this.taskRepository.find();
    }
    async findOne(id) {
        return await this.taskRepository.findOne({ where: { id } });
    }
    async finishTask(taskId) {
        const task = await this.findOne(taskId);
        if (task) {
            task.isCompleted = true;
            task.isActive = false;
            await this.taskRepository.save(task);
            console.log(`Tarea "${task.name}" marcada como completada.`);
        }
    }
    async scheduleNextRecurrence(task) {
        if (task.recurrence) {
            const recurrenceInterval = this.parseISO8601Duration(task.recurrence);
            if (recurrenceInterval) {
                const nextEndTime = new Date(new Date().getTime() + recurrenceInterval);
                const newTask = this.taskRepository.create({
                    ...task,
                    id: undefined,
                    startTime: new Date(),
                    endTime: nextEndTime,
                    isCompleted: false,
                    isActive: true,
                });
                await this.taskRepository.save(newTask);
                console.log(`La próxima instancia de la tarea "${task.name}" se ha programado para ${nextEndTime}.`);
                this.scheduleTask(newTask);
            }
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map