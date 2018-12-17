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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const trade_entity_1 = require("./trade.entity");
const book_entity_1 = require("../book/book.entity");
const user_entity_1 = require("../user/user.entity");
const trade_dto_1 = require("./trade.dto");
let TradeService = class TradeService {
    constructor(tradeRepository, bookRepository, userRepository) {
        this.tradeRepository = tradeRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }
    toResponseObject(trade) {
        return Object.assign({}, trade, { tradeOwnerBook: trade.tradeOwnerBook, targetBook: trade.targetBook, targetUser: trade.targetUser.userToRO(false, false), tradeOwner: trade.tradeOwner.userToRO(false, false) });
    }
    showRequestedTrades(user_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const trades = yield this.tradeRepository.find({
                where: { tradeOwnerId: user_Id },
                relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
            });
            return trades.map(trade => this.toResponseObject(trade));
        });
    }
    showPendingTrades(user_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const trades = yield this.tradeRepository.find({
                where: { targetUserId: user_Id },
                relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
            });
            return trades.map(trade => this.toResponseObject(trade));
        });
    }
    createTrade(user_Id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tradeOwner = yield this.userRepository.findOne({
                where: { id: user_Id },
            });
            const targetUser = yield this.userRepository.findOne({
                where: { id: data.targetUserId },
            });
            const targetBook = yield this.bookRepository.findOne({
                where: { id: data.targetBookId },
            });
            const tradeExists = yield this.tradeRepository.findOne({
                where: { tradeOwner, targetBook, targetUser },
            });
            const tradeOwnerBook = null;
            if (tradeExists) {
                throw new common_1.HttpException('Book already in the Trade list', common_1.HttpStatus.BAD_REQUEST);
            }
            const trade = yield this.tradeRepository.create({
                tradeStatus: data.tradeStatus,
                tradeOwner,
                targetUser,
                targetBook,
                tradeOwnerBook,
            });
            yield this.tradeRepository.save(trade);
            return { status: common_1.HttpStatus.CREATED, message: 'Created', id: trade.id };
        });
    }
    updateTrade(id, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataForUpdate = class_transformer_1.plainToClass(trade_dto_1.TradeForUpdate, data);
            const trade = yield this.tradeRepository.findOne({
                where: { id },
                relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
            });
            console.log('trade', data);
            if (!trade) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            yield this.tradeRepository.update({ id }, data);
            const tradeForReturn = yield this.tradeRepository.findOne({
                where: { id },
                relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
            });
            return this.toResponseObject(tradeForReturn);
        });
    }
    patchTrade(id, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const trade = yield this.tradeRepository.findOne({
                where: { id },
                relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
            });
            console.log('data', data);
            if (!trade) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            yield this.tradeRepository.update(id, data);
            const tradeForReturn = yield this.tradeRepository.findOne({
                where: { id },
                relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
            });
            return this.toResponseObject(tradeForReturn);
        });
    }
    deleteTrade(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id: userId } });
            const trade = yield this.tradeRepository.findOne({ where: { id } });
            if (!trade) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            yield this.tradeRepository.delete({ id });
            return { status: common_1.HttpStatus.NO_CONTENT, message: 'Deleted' };
        });
    }
};
TradeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(trade_entity_1.TradeEntity)),
    __param(1, typeorm_1.InjectRepository(book_entity_1.BookEntity)),
    __param(2, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TradeService);
exports.TradeService = TradeService;
//# sourceMappingURL=trade.service.js.map