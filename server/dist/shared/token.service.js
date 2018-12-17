"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
let TokenService = class TokenService {
    sign(user) {
        return jsonwebtoken_1.sign({
            id: user.id,
            isStaff: user.isStaff,
            isActive: user.isActive,
            isSuperuser: user.isSuperuser,
            groups: user.groups.map(group => {
                return { name: group.name };
            }),
        }, this.getSecretKey({
            id: user.id,
            isStaff: user.isStaff,
            isActive: user.isActive,
            isSuperuser: user.isSuperuser,
            groups: user.groups,
        }), {
            expiresIn: process.env.JWT_EXPIRATION_DELTA,
        });
    }
    verify(token) {
        const data = jsonwebtoken_1.decode(token);
        return jsonwebtoken_1.verify(token, this.getSecretKey(data));
    }
    decode(token) {
        return jsonwebtoken_1.decode(token);
    }
    getSecretKey(data) {
        return (process.env.SECRET +
            (data
                ? '$' +
                    data.id +
                    '$' +
                    data.isStaff +
                    '$' +
                    data.isActive +
                    '$' +
                    data.isSuperuser +
                    (data.groups ? data.groups.map(group => '$' + group.name) : '')
                : ''));
    }
};
TokenService = __decorate([
    common_1.Component()
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map