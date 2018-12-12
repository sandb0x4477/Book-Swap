import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  UseGuards,
  Delete,
  Param,
  Logger,
  Query,
} from '@nestjs/common';

import { AuthGuard } from '../shared/auth.gaurd';
import { ValidationPipe } from './../shared/validation.pipe';
import { BookService } from './book.service';
import { BookEntity } from './book.entity';
import { BookForCreation } from './book.dto';
import { User } from 'src/user/user.decorator';

@Controller('api/books')
export class BookController {
  private logger = new Logger('BookController');

  constructor(private bookService: BookService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
  }

  @Get('/random')
  @UseGuards(new AuthGuard())
  showRandomBooks() {
    return this.bookService.showRandomBooks();
  }

  @Get()
  @UseGuards(new AuthGuard())
  showUserBooks(@User('id') user) {
    return this.bookService.showBooksByUserId(user);
  }

  @Get('/latest')
  @UseGuards(new AuthGuard())
  showRecentBooks(@User('id') user, @Query('page') page: number) {
    return this.bookService.showRecentBooks(user, page);
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  showBooksByUserId(@Param('id') userId: string) {
    return this.bookService.showBooksByUserId(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  createBook(@User('id') user, @Body() body: BookForCreation) {
    this.logData({ user, body });
    return this.bookService.createBook(user, body);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  deleteCustomer(@User('id') user, @Param('id') id: string) {
    return this.bookService.deleteBook(user, id);
  }

  // @Post('auth/login')
  // @UsePipes(new ValidationPipe())
  // login(@Body() data: UserForLoginDTO) {
  //   return this.bookService.login(data);
  // }
}
