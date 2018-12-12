import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class TradeForCreation {
  @IsNotEmpty()
  @IsString()
  tradeStatus: string;

  tradeOwnerId: string;

  tradeOwnerBookId: string;

  @IsNotEmpty()
  @IsString()
  targetUserId: string;

  @IsNotEmpty()
  @IsString()
  targetBookId: string;

}
