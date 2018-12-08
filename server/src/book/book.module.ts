import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from './book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, UserEntity])],
  controllers: [BookController],
  providers: [BookService],
})

export class BookModule {}
