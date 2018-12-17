import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { BookForCreation } from './book.dto';
import { UserEntity } from '../user/user.entity';
export declare class BookService {
    private bookRepository;
    private userRepository;
    constructor(bookRepository: Repository<BookEntity>, userRepository: Repository<UserEntity>);
    private toResponseObject;
    showRandomBooks(): Promise<BookEntity[]>;
    showRecentBooks(user_Id: string, page?: number): Promise<{
        books: BookEntity[];
        bookCount: number;
        page: number;
    }>;
    showBooksByUserId(userId: string): Promise<{
        books: BookEntity[];
        user: import("../user/user.dto").UserForReturnDTO;
    }>;
    createBook(userId: string, data: BookForCreation): Promise<{
        status: HttpStatus;
        message: string;
        id: string;
    }>;
    deleteBook(userId: string, id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
