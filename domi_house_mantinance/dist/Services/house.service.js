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
exports.HousesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const house_entity_1 = require("../Entities/house.entity");
let HousesService = class HousesService {
    constructor(houseRepository) {
        this.houseRepository = houseRepository;
    }
    async createHouse(houseData) {
        const newHouse = this.houseRepository.create(houseData);
        return this.houseRepository.save(newHouse);
    }
    async findAll() {
        return this.houseRepository.find({ relations: ['rooms'] });
    }
    async findById(id) {
        const house = await this.houseRepository.findOne({
            where: { id },
            relations: ['rooms'],
        });
        if (!house) {
            throw new common_1.NotFoundException(`House with ID ${id} not found.`);
        }
        return house;
    }
    async updateHouse(id, updateData) {
        const house = await this.findById(id);
        Object.assign(house, updateData);
        return this.houseRepository.save(house);
    }
    async deleteHouse(id) {
        const result = await this.houseRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`House with ID ${id} not found.`);
        }
        return `House with ID ${id} has been deleted successfully.`;
    }
};
exports.HousesService = HousesService;
exports.HousesService = HousesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(house_entity_1.House)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HousesService);
//# sourceMappingURL=house.service.js.map