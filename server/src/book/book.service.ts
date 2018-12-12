import {
  Injectable,
  HttpException,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

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

  // ! RANDOM BOOKS
  async showRandomBooks() {
    const books = await this.bookRepository
      .createQueryBuilder('book')
      .orderBy('RANDOM()')
      .limit(3)
      .getMany();

    return books;
  }

  // ! SHOW RECENT BOOKS
  async showRecentBooks(user_Id: string, page: number = 1) {
    const [books, bookCount] = await this.bookRepository.findAndCount({
      where: { user: { id: Not(user_Id) } },
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
  }

  // ! SHOW ALL
  async showBooksByUserId(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const [books, bookCount] = await this.bookRepository.findAndCount({
      where: { user },
    });
    const username = user.username;

    const userid = user.id;

    // return books.map(book => this.toResponseObject(book));
    return { userid, username, books, bookCount };
  }

  //  ! CREATE
  async createBook(userId: string, data: BookForCreation) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const bookFromRepo = await this.bookRepository.findOne({
      where: { googleId: data.googleId, userId },
    });

    if (bookFromRepo) {
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
  async deleteBook(userId: string, id: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const book = await this.bookRepository.findOne({ where: { id, user } });

    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.bookRepository.delete({ id });

    return { status: HttpStatus.NO_CONTENT, message: 'Deleted' };
  }
}
