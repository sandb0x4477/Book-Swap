import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserForLoginDTO, UserForRegisterDTO } from './user.dto';
import { BookEntity } from '../book/book.entity';
export declare class UserService {
    private userRepository;
    private bookRepository;
    constructor(userRepository: Repository<UserEntity>, bookRepository: Repository<BookEntity>);
    showAll(userId: string): Promise<import("./user.dto").UserForReturnDTO[]>;
    register(data: UserForRegisterDTO): Promise<HttpStatus>;
    login(data: UserForLoginDTO): Promise<import("./user.dto").UserForReturnDTO>;
}
