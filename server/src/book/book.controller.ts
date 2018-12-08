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

  @Get()
  @UseGuards(new AuthGuard())
  showAllBooks(@User('id') user) {
    return this.bookService.showAll(user);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  createBook(@User('id') user, @Body() body: BookForCreation) {
    this.logData({ user, body });
    return this.bookService.createBook(user, body);
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }

  // @Post('auth/login')
  // @UsePipes(new ValidationPipe())
  // login(@Body() data: UserForLoginDTO) {
  //   return this.bookService.login(data);
  // }
}
