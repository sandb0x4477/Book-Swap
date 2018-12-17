import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { TradeEntity } from './trade.entity';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';
import { TradeForCreation, TradeForUpdate } from './trade.dto';

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
      ...trade,
      tradeOwnerBook: trade.tradeOwnerBook,
      targetBook: trade.targetBook,
      targetUser: trade.targetUser.userToRO(false, false),
      tradeOwner: trade.tradeOwner.userToRO(false, false),
    };
  }

  // =============================================================================
  // ! SHOW ALL TRADES
  // =============================================================================
  async showAllTrades(user_Id: string) {
    const tradesRequested = await this.tradeRepository.find({
      where: { tradeOwnerId: user_Id },
      relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
    });
    const tradesPending = await this.tradeRepository.find({
      where: { targetUserId: user_Id },
      relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
    });

    const trades = [...tradesRequested, ...tradesPending];

    // return {trades, targetBook: targetBook};
    return trades.map(trade => this.toResponseObject(trade));
  }

  // =============================================================================
  // ! SHOW REQUESTED TRADES
  // =============================================================================
  async showRequestedTrades(user_Id: string) {
    const trades = await this.tradeRepository.find({
      where: { tradeOwnerId: user_Id },
      relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
    });

    return trades.map(trade => this.toResponseObject(trade));
  }

  // =============================================================================
  // ? SHOW PENDING TRADES
  // =============================================================================
  async showPendingTrades(user_Id: string) {
    const trades = await this.tradeRepository.find({
      where: { targetUserId: user_Id },
      relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
    });

    return trades.map(trade => this.toResponseObject(trade));
  }

  // ===========================================================================
  // ! CREATE TRADE
  // ===========================================================================
  async createTrade(user_Id: string, data: Partial<TradeForCreation>) {

    data.tradeOwnerId = user_Id;

    const tradeExists = await this.tradeRepository.findOne({
      where: { tradeOwnerId: data.tradeOwnerId, targetBookId: data.targetBookId, targetUserId: data.targetUserId },
    });

    if (tradeExists) {
      throw new HttpException(
        'Book already in the Trade list',
        HttpStatus.BAD_REQUEST,
      );
    }

    const trade = await this.tradeRepository.create(data);

    await this.tradeRepository.save(trade);
    return { status: HttpStatus.CREATED, message: 'Created', id: trade.id };
  }

  // =============================================================================
  // ? UPDATE
  // =============================================================================
  async updateTrade(id: string, userId: string, data: Partial<TradeForUpdate>) {
    const trade = await this.tradeRepository.findOne({
      where: { id },
      relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
    });
    // tslint:disable-next-line:no-console
    console.log('trade', data);
    if (!trade) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.tradeRepository.update({ id }, data);

    const tradeForReturn = await this.tradeRepository.findOne({
      where: { id },
      relations: ['targetBook', 'targetUser', 'tradeOwnerBook', 'tradeOwner'],
    });

    return this.toResponseObject(tradeForReturn);
  }

  // =============================================================================
  // ! DELETE
  // =============================================================================
  async deleteTrade(userId: string, id: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const trade = await this.tradeRepository.findOne({ where: { id } });

    if (!trade) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.tradeRepository.delete({ id });

    return { status: HttpStatus.NO_CONTENT, message: 'Deleted' };
  }
}
