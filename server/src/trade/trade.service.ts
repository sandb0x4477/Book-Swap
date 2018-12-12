import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { TradeEntity } from './trade.entity';
import { BookEntity } from 'src/book/book.entity';
import { UserEntity } from 'src/user/user.entity';
import { TradeForCreation } from './trade.dto';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(TradeEntity)
    private tradeRepository: Repository<TradeEntity>,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private toResponseObject(trade: TradeEntity) {
    return {
      id: trade.id,
      created: trade.created,
      updated: trade.updated,
      tradeOwnerId: trade.tradeOwnerId,
      tradeStatus: trade.tradeStatus,
      tradeOwnerBookId: trade.tradeOwnerBookId,
      targetBook: trade.targetBook,
      targetUser: trade.targetUser.userToROShort(),
    };
  }

  async showAllTradesForUser(user_Id: string) {
    const trades = await this.tradeRepository.find({
      where: { tradeOwnerId: user_Id },
      relations: ['targetBook', 'targetUser'],
    });
    // return trades;
    return trades.map(trade => this.toResponseObject(trade));

  }

  async createTrade(user_Id: string, data: TradeForCreation) {
    const tradeOwner = await this.userRepository.findOne({
      where: { id: user_Id },
    });
    const tradeOwnerBook = await this.bookRepository.findOne({
      where: { id: data.tradeOwnerBookId },
    });
    const targetUser = await this.userRepository.findOne({
      where: { id: data.targetUserId },
    });
    const targetBook = await this.bookRepository.findOne({
      where: { id: data.targetBookId },
    });

    const tradeExists = await this.tradeRepository.findOne({
     where: { tradeOwner, targetBook, targetUser },
    });

    if (tradeExists) {
      throw new HttpException(
        'Book already in the Trade list',
        HttpStatus.BAD_REQUEST,
      );
    }

    const trade = await this.tradeRepository.create({
      tradeStatus: data.tradeStatus,
      tradeOwner,
      targetUser,
      targetBook,
      tradeOwnerBook,
    });

    await this.tradeRepository.save(trade);
    return { status: HttpStatus.CREATED, message: 'Created', id: trade.id };
  }
}
