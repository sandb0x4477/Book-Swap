import { UserForReturnDTO } from './user.dto';
import { BookEntity } from '../book/book.entity';
export declare class UserEntity {
    id: string;
    created: Date;
    username: string;
    password: string;
    email: string;
    address: string;
    city: string;
    books: BookEntity[];
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
    userToROShort(): {
        id: string;
        username: string;
        city: string;
    };
    userToRO(showBookCount?: boolean, showToken?: boolean): UserForReturnDTO;
    private readonly token;
}
