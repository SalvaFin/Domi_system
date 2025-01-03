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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const room_entity_1 = require("../Entities/room.entity");
const house_service_1 = require("./house.service");
let RoomsService = class RoomsService {
    constructor(roomRepository, housesService) {
        this.roomRepository = roomRepository;
        this.housesService = housesService;
    }
    async createRoom(room) {
        const house = await this.housesService.findById(room.house.id);
        if (!house) {
            throw new common_1.NotFoundException(`House with ID ${room.house.id} not found.`);
        }
        const newRoom = this.roomRepository.create({
            ...room,
            house,
        });
        return await this.roomRepository.save(newRoom);
    }
    findAll() {
        return this.roomRepository.find({
            relations: ['house'],
        });
    }
    async findById(id) {
        const room = await this.roomRepository.findOne({
            where: { id },
            relations: ['house'],
        });
        if (!room) {
            throw new common_1.NotFoundException(`Room with ID ${id} not found.`);
        }
        return room;
    }
    async updateRoom(id, updateData) {
        const room = await this.findById(id);
        Object.assign(room, updateData);
        return await this.roomRepository.save(room);
    }
    async deleteRoom(id) {
        const result = await this.roomRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Room with ID ${id} not found.`);
        }
        return `Room with ID ${id} has been deleted successfully.`;
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        house_service_1.HousesService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map