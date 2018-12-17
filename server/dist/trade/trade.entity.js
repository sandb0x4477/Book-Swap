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
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const book_entity_1 = require("../book/book.entity");
let TradeEntity = class TradeEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], TradeEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TradeEntity.prototype, "tradeStatus", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], TradeEntity.prototype, "tradeOwnerId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], TradeEntity.prototype, "tradeOwner", void 0);
__decorate([
    typeorm_1.ManyToOne(type => book_entity_1.BookEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", book_entity_1.BookEntity)
], TradeEntity.prototype, "tradeOwnerBook", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], TradeEntity.prototype, "tradeOwnerBookId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], TradeEntity.prototype, "targetUserId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], TradeEntity.prototype, "targetUser", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], TradeEntity.prototype, "targetBookId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => book_entity_1.BookEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", book_entity_1.BookEntity)
], TradeEntity.prototype, "targetBook", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], TradeEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], TradeEntity.prototype, "updated", void 0);
TradeEntity = __decorate([
    typeorm_1.Entity('trades')
], TradeEntity);
exports.TradeEntity = TradeEntity;
//# sourceMappingURL=trade.entity.js.map