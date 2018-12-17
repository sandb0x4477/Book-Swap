import { TradeService } from './trade.service';
import { TradeForCreation } from './trade.dto';
export declare class TradeController {
    private tradeService;
    constructor(tradeService: TradeService);
    showRequestedTrades(user: string): Promise<{
        tradeOwnerBook: import("../book/book.entity").BookEntity;
        targetBook: import("../book/book.entity").BookEntity;
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
    showPendingTrades(user: string): Promise<{
        tradeOwnerBook: import("../book/book.entity").BookEntity;
        targetBook: import("../book/book.entity").BookEntity;
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
    patchTrade(id: string, user: string, body: any): Promise<{
        tradeOwnerBook: import("../book/book.entity").BookEntity;
        targetBook: import("../book/book.entity").BookEntity;
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
    updateTrade(id: string, user: string, body: any): Promise<{
        tradeOwnerBook: import("../book/book.entity").BookEntity;
        targetBook: import("../book/book.entity").BookEntity;
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
    createTrade(user: string, body: TradeForCreation): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        id: string;
    }>;
    deleteTrade(user: string, id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
