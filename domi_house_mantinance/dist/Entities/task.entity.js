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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./room.entity");
const swagger_1 = require("@nestjs/swagger");
const task_type_enum_1 = require("../Enums/task-type.enum");
let Task = class Task {
};
exports.Task = Task;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ description: 'ID único de la tarea en formato GUID' }),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la tarea' }),
    __metadata("design:type", String)
], Task.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Descripción de la tarea' }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime2', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Hora de inicio de la tarea' }),
    __metadata("design:type", Date)
], Task.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime2', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Hora de finalización de la tarea' }),
    __metadata("design:type", Date)
], Task.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        enum: task_type_enum_1.TaskType,
        default: task_type_enum_1.TaskType.OTHER,
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de tarea',
        enum: task_type_enum_1.TaskType,
        enumName: 'TaskType',
    }),
    __metadata("design:type", Number)
], Task.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Periodicidad de la tarea en formato ISO 8601' }),
    __metadata("design:type", String)
], Task.prototype, "recurrence", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({ description: 'Indica si la tarea ha sido completada' }),
    __metadata("design:type", Boolean)
], Task.prototype, "isCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: false }),
    (0, swagger_1.ApiProperty)({ description: 'Indica si la tarea está activa' }),
    __metadata("design:type", Boolean)
], Task.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, (room) => room.tasks, { onDelete: 'SET NULL' }),
    (0, swagger_1.ApiProperty)({ description: 'Habitación asociada a la tarea', type: () => room_entity_1.Room }),
    __metadata("design:type", room_entity_1.Room)
], Task.prototype, "room", void 0);
exports.Task = Task = __decorate([
    (0, typeorm_1.Entity)('tasks')
], Task);
//# sourceMappingURL=task.entity.js.map