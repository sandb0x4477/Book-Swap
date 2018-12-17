import { BookService } from './book.service';
import { BookEntity } from './book.entity';
import { BookForCreation } from './book.dto';
export declare class BookController {
    private bookService;
    private logger;
    constructor(bookService: BookService);
    private logData;
    showRandomBooks(): Promise<BookEntity[]>;
    showUserBooks(user: any): Promise<{
        books: BookEntity[];
        user: import("../user/user.dto").UserForReturnDTO;
    }>;
    showRecentBooks(user: any, page: number): Promise<{
        books: BookEntity[];
        bookCount: number;
        page: number;
    }>;
    showBooksByUserId(userId: string): Promise<{
        books: BookEntity[];
        user: import("../user/user.dto").UserForReturnDTO;
    }>;
    createBook(user: any, body: BookForCreation): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        id: string;
    }>;
    deleteCustomer(user: any, id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
