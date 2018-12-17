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
const common_1 = require("@nestjs/common");
const auth_gaurd_1 = require("../shared/auth.gaurd");
const validation_pipe_1 = require("./../shared/validation.pipe");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const user_decorator_1 = require("./user.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    showAllUsers(user) {
        return this.userService.showAll(user);
    }
    register(data) {
        return this.userService.register(data);
    }
    login(data) {
        return this.userService.login(data);
    }
};
__decorate([
    common_1.Get('users'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "showAllUsers", null);
__decorate([
    common_1.Post('auth/register'),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserForRegisterDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    common_1.Post('auth/login'),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserForLoginDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
UserController = __decorate([
    common_1.Controller('api/'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map