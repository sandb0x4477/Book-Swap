import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TradeEntity } from './trade.entity';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { UserEntity } from 'src/user/user.entity';
import { BookEntity } from 'src/book/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TradeEntity, UserEntity, BookEntity])],
  providers: [TradeService],
  controllers: [TradeController],
})

export class TradeModule {}
