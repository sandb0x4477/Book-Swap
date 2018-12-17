import { UserEntity } from '../user/user.entity';
import { BookEntity } from '../book/book.entity';
export declare class TradeEntity {
    id: string;
    tradeStatus: string;
    tradeOwnerId: string;
    tradeOwner: UserEntity;
    tradeOwnerBook: BookEntity;
    tradeOwnerBookId: string;
    targetUserId: string;
    targetUser: UserEntity;
    targetBookId: string;
    targetBook: BookEntity;
    created: Date;
    updated: Date;
}
