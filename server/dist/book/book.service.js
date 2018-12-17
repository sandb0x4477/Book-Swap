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
const book_entity_1 = require("./book.entity");
const user_entity_1 = require("../user/user.entity");
let BookService = class BookService {
    constructor(bookRepository, userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }
    toResponseObject(book) {
        return Object.assign({}, book, { user: book.user && book.user.id });
    }
    showRandomBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.bookRepository
                .createQueryBuilder('book')
                .orderBy('RANDOM()')
                .limit(3)
                .getMany();
            return books;
        });
    }
    showRecentBooks(user_Id, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const [books, bookCount] = yield this.bookRepository.findAndCount({
                where: { user: { id: typeorm_2.Not(user_Id) } },
                order: {
                    created: 'DESC',
                },
                take: 6,
                skip: 6 * (page - 1),
            });
            return {
                books,
                bookCount,
                page,
            };
        });
    }
    showBooksByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                relations: ['books'],
            });
            if (!user) {
                throw new common_1.HttpException('User not Found', common_1.HttpStatus.NOT_FOUND);
            }
            const books = yield this.bookRepository.find({
                where: { user },
            });
            return { books, user: user.userToRO(true, false) };
        });
    }
    createBook(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id: userId } });
            const bookFromRepo = yield this.bookRepository.findOne({
                where: { googleId: data.googleId, userId },
            });
            if (bookFromRepo) {
                throw new common_1.HttpException('Book already in the List', common_1.HttpStatus.BAD_REQUEST);
            }
            const book = yield this.bookRepository.create(Object.assign({}, data, { user }));
            yield this.bookRepository.save(book);
            return { status: common_1.HttpStatus.CREATED, message: 'Created', id: book.id };
        });
    }
    deleteBook(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id: userId } });
            const book = yield this.bookRepository.findOne({ where: { id, user } });
            if (!book) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            yield this.bookRepository.delete({ id });
            return { status: common_1.HttpStatus.NO_CONTENT, message: 'Deleted' };
        });
    }
};
BookService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(book_entity_1.BookEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map