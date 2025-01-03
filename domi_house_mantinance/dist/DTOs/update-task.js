"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_task_1 = require("./create-task");
class UpdateTaskDto extends (0, swagger_1.PartialType)(create_task_1.CreateTaskDto) {
}
exports.UpdateTaskDto = UpdateTaskDto;
//# sourceMappingURL=update-task.js.map