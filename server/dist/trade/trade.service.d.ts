import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TradeEntity } from './trade.entity';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';
import { TradeForCreation, TradeForUpdate } from './trade.dto';
export declare class TradeService {
    private tradeRepository;
    private bookRepository;
    private userRepository;
    constructor(tradeRepository: Repository<TradeEntity>, bookRepository: Repository<BookEntity>, userRepository: Repository<UserEntity>);
    private toResponseObject;
    showRequestedTrades(user_Id: string): Promise<{
        tradeOwnerBook: BookEntity;
        targetBook: BookEntity;
        targetUser: import("../user/user.dto").UserForReturnDTO;
        tradeOwner: import("../user/user.dto").UserForReturnDTO;
        id: string;
        tradeStatus: string;
        tradeOwnerId: string;
        tradeOwnerBookId: string;
        targetUserId: string;
        targetBookId: string;
        created: Date;
        updated: Date;
    }[]>;
    showPendingTrades(user_Id: string): Promise<{
        tradeOwnerBook: BookEntity;
        targetBook: BookEntity;
        targetUser: import("../user/user.dto").UserForReturnDTO;
        tradeOwner: import("../user/user.dto").UserForReturnDTO;
        id: string;
        tradeStatus: string;
        tradeOwnerId: string;
        tradeOwnerBookId: string;
        targetUserId: string;
        targetBookId: string;
        created: Date;
        updated: Date;
    }[]>;
    createTrade(user_Id: string, data: TradeForCreation): Promise<{
        status: HttpStatus;
        message: string;
        id: string;
    }>;
    updateTrade(id: string, userId: string, data: Partial<TradeForUpdate>): Promise<{
        tradeOwnerBook: BookEntity;
        targetBook: BookEntity;
        targetUser: import("../user/user.dto").UserForReturnDTO;
        tradeOwner: import("../user/user.dto").UserForReturnDTO;
        id: string;
        tradeStatus: string;
        tradeOwnerId: string;
        tradeOwnerBookId: string;
        targetUserId: string;
        targetBookId: string;
        created: Date;
        updated: Date;
    }>;
    patchTrade(id: string, userId: string, data: Partial<TradeEntity>): Promise<{
        tradeOwnerBook: BookEntity;
        targetBook: BookEntity;
        targetUser: import("../user/user.dto").UserForReturnDTO;
        tradeOwner: import("../user/user.dto").UserForReturnDTO;
        id: string;
        tradeStatus: string;
        tradeOwnerId: string;
        tradeOwnerBookId: string;
        targetUserId: string;
        targetBookId: string;
        created: Date;
        updated: Date;
    }>;
    deleteTrade(userId: string, id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
