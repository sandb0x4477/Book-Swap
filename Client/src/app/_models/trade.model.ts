import { Book } from './book.model';
import { User } from './user.model';

export class Trade {
  id: string;
  tradeStatus: string;
  tradeOwnerId: string;
  tradeOwnerBookId: string | null;
  targetUserId: string;
  targetBookId: string;
  created?: string;
  updated?: string;
  tradeOwner: User;
  targetUser: User;
  tradeOwnerBook: Book;
  targetBook: Book;
}

