"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./Entities/room.entity");
const rooms_controller_1 = require("./Controllers/rooms.controller");
const rooms_service_1 = require("./Services/rooms.service");
const task_entity_1 = require("./Entities/task.entity");
const task_controller_1 = require("./Controllers/task.controller");
const task_service_1 = require("./Services/task.service");
const house_entity_1 = require("./Entities/house.entity");
const house_controller_1 = require("./Controllers/house.controller");
const house_service_1 = require("./Services/house.service");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mssql',
                host: 'localhost',
                port: 1433,
                username: 'sa',
                password: '123',
                database: 'Domi',
                entities: [room_entity_1.Room, house_entity_1.House, task_entity_1.Task],
                synchronize: false,
                extra: {
                    trustServerCertificate: true,
                },
                options: {
                    useUTC: true,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([room_entity_1.Room, house_entity_1.House, task_entity_1.Task]),
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [rooms_controller_1.RoomsController, house_controller_1.HousesController, task_controller_1.TaskController],
        providers: [rooms_service_1.RoomsService, house_service_1.HousesService, task_service_1.TaskService],
        exports: [rooms_service_1.RoomsService, house_service_1.HousesService, task_service_1.TaskService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map