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
exports.House = void 0;
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./room.entity");
const swagger_1 = require("@nestjs/swagger");
let House = class House {
};
exports.House = House;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'ID único de la casa' }),
    __metadata("design:type", Number)
], House.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la casa' }),
    __metadata("design:type", String)
], House.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Calle donde se encuentra la casa' }),
    __metadata("design:type", String)
], House.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Ciudad donde se encuentra la casa' }),
    __metadata("design:type", String)
], House.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Código postal de la casa' }),
    __metadata("design:type", String)
], House.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Número de pisos que tiene la casa' }),
    __metadata("design:type", Number)
], House.prototype, "floors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_entity_1.Room, (room) => room.house),
    (0, swagger_1.ApiProperty)({ description: 'Habitaciones asociadas a la casa', type: () => [room_entity_1.Room] }),
    __metadata("design:type", Array)
], House.prototype, "rooms", void 0);
exports.House = House = __decorate([
    (0, typeorm_1.Entity)('houses')
], House);
//# sourceMappingURL=house.entity.js.map