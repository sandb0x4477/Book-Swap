import {
  Injectable,
  HttpException,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookEntity } from './book.entity';
import { BookForCreation } from './book.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

    private toResponseObject(book: BookEntity) {
      return {
        ...book,
        user: book.user && book.user.id,
      };
    }

  // ? SHOW ALL
  async showAll(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const books = await this.bookRepository.find({
      where: {user},
    });

    return books.map(book => this.toResponseObject(book));
    // return books;
  }

  //  ! CREATE
  async createBook(userId: string, data: BookForCreation) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const bookFromDb = await this.bookRepository.findOne({
      where: { id: data.id },
    });

    if (bookFromDb) {
      throw new HttpException(
        'Book already in the List',
        HttpStatus.BAD_REQUEST,
      );
    }

    const book = await this.bookRepository.create({ ...data, user });
    await this.bookRepository.save(book);

    // return book;
    return { status: HttpStatus.CREATED, message: 'Created', id: book.id };
  }

  // ! DELETE
  async deleteBook(id: string) {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.bookRepository.delete({ id });

    return { status: HttpStatus.NO_CONTENT, message: 'Deleted', id: book.id };
  }
}
