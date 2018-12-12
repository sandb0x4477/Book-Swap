export class Trade {
  id: string;
  tradeStatus: string;
  tradeOwnerId: string;
  tradeOwnerBookId: string | null;
  targetUserId: string;
  targetBookId: string;
  created?: string;
  updated?: string;
}
