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
const user_decorator_1 = require("../user/user.decorator");
const trade_service_1 = require("./trade.service");
const auth_gaurd_1 = require("../shared/auth.gaurd");
const trade_dto_1 = require("./trade.dto");
let TradeController = class TradeController {
    constructor(tradeService) {
        this.tradeService = tradeService;
    }
    showRequestedTrades(user) {
        return this.tradeService.showRequestedTrades(user);
    }
    showPendingTrades(user) {
        return this.tradeService.showPendingTrades(user);
    }
    patchTrade(id, user, body) {
        return this.tradeService.patchTrade(id, user, body);
    }
    updateTrade(id, user, body) {
        return this.tradeService.updateTrade(id, user, body);
    }
    createTrade(user, body) {
        return this.tradeService.createTrade(user, body);
    }
    deleteTrade(user, id) {
        return this.tradeService.deleteTrade(user, id);
    }
};
__decorate([
    common_1.Get('/requested'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TradeController.prototype, "showRequestedTrades", null);
__decorate([
    common_1.Get('/pending'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TradeController.prototype, "showPendingTrades", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TradeController.prototype, "patchTrade", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TradeController.prototype, "updateTrade", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, trade_dto_1.TradeForCreation]),
    __metadata("design:returntype", void 0)
], TradeController.prototype, "createTrade", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TradeController.prototype, "deleteTrade", null);
TradeController = __decorate([
    common_1.Controller('api/trades'),
    __metadata("design:paramtypes", [trade_service_1.TradeService])
], TradeController);
exports.TradeController = TradeController;
//# sourceMappingURL=trade.controller.js.map