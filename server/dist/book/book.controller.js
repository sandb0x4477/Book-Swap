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
const book_service_1 = require("./book.service");
const book_dto_1 = require("./book.dto");
const user_decorator_1 = require("../user/user.decorator");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
        this.logger = new common_1.Logger('BookController');
    }
    logData(options) {
        options.user && this.logger.log('USER ' + JSON.stringify(options.user));
        options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
    }
    showRandomBooks() {
        return this.bookService.showRandomBooks();
    }
    showUserBooks(user) {
        return this.bookService.showBooksByUserId(user);
    }
    showRecentBooks(user, page) {
        return this.bookService.showRecentBooks(user, page);
    }
    showBooksByUserId(userId) {
        return this.bookService.showBooksByUserId(userId);
    }
    createBook(user, body) {
        this.logData({ user, body });
        return this.bookService.createBook(user, body);
    }
    deleteCustomer(user, id) {
        return this.bookService.deleteBook(user, id);
    }
};
__decorate([
    common_1.Get('/random'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "showRandomBooks", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "showUserBooks", null);
__decorate([
    common_1.Get('/latest'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "showRecentBooks", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "showBooksByUserId", null);
__decorate([
    common_1.Post(),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_dto_1.BookForCreation]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "createBook", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "deleteCustomer", null);
BookController = __decorate([
    common_1.Controller('api/books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map