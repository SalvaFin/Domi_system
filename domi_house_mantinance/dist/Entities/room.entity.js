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
exports.Room = void 0;
const typeorm_1 = require("typeorm");
const room_type_enum_1 = require("../Enums/room-type.enum");
const house_entity_1 = require("./house.entity");
const task_entity_1 = require("./task.entity");
const swagger_1 = require("@nestjs/swagger");
let Room = class Room {
};
exports.Room = Room;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'ID único de la habitación' }),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la habitación' }),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Tamaño de la habitación' }),
    __metadata("design:type", Number)
], Room.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        enum: room_type_enum_1.RoomType,
        default: room_type_enum_1.RoomType.OTHER,
    }),
    (0, swagger_1.ApiProperty)({ description: 'Tipo de la habitación' }),
    __metadata("design:type", Number)
], Room.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, swagger_1.ApiProperty)({ description: 'Habitacion usable' }),
    __metadata("design:type", Boolean)
], Room.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Piso de la habitación' }),
    __metadata("design:type", String)
], Room.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => house_entity_1.House, (house) => house.rooms, { onDelete: 'CASCADE' }),
    (0, swagger_1.ApiProperty)({ description: 'Casa de la habitación' }),
    __metadata("design:type", house_entity_1.House)
], Room.prototype, "house", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.room),
    (0, swagger_1.ApiProperty)({ description: 'Tareas asociadas a la habitación', type: () => [task_entity_1.Task] }),
    __metadata("design:type", Array)
], Room.prototype, "tasks", void 0);
exports.Room = Room = __decorate([
    (0, typeorm_1.Entity)('rooms')
], Room);
//# sourceMappingURL=room.entity.js.map