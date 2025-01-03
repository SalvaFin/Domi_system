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
exports.HousesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const house_service_1 = require("../Services/house.service");
const house_entity_1 = require("../Entities/house.entity");
let HousesController = class HousesController {
    constructor(housesService) {
        this.housesService = housesService;
    }
    createHouse(houseData) {
        return this.housesService.createHouse(houseData);
    }
    getAllHouses() {
        return this.housesService.findAll();
    }
    getHouseById(id) {
        return this.housesService.findById(id);
    }
    updateHouse(id, updateData) {
        return this.housesService.updateHouse(id, updateData);
    }
    deleteHouse(id) {
        return this.housesService.deleteHouse(id);
    }
};
exports.HousesController = HousesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Casa creada exitosamente.', type: house_entity_1.House }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "createHouse", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de todas las casas.', type: [house_entity_1.House] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "getAllHouses", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la casa' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalles de la casa.', type: house_entity_1.House }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Casa no encontrada.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "getHouseById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la casa' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Casa actualizada exitosamente.', type: house_entity_1.House }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "updateHouse", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la casa' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Casa eliminada exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Casa no encontrada.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "deleteHouse", null);
exports.HousesController = HousesController = __decorate([
    (0, common_1.Controller)('houses'),
    __metadata("design:paramtypes", [house_service_1.HousesService])
], HousesController);
//# sourceMappingURL=house.controller.js.map