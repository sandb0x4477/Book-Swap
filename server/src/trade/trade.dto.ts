import { IsString, IsNotEmpty, IsArray, IsEmpty } from 'class-validator';

export class TradeForCreation {
  @IsNotEmpty()
  @IsString()
  tradeStatus: string;

  @IsNotEmpty()
  @IsString()
  targetUserId: string;

  @IsNotEmpty()
  @IsString()
  targetBookId: string;

  @IsEmpty()
  tradeOwnerId: string;

}

export class TradeForUpdate {
  @IsNotEmpty()
  @IsString()
  tradeStatus: string;

  @IsNotEmpty()
  @IsString()
  targetUserId: string;

  @IsNotEmpty()
  @IsString()
  targetBookId: string;

  tradeOwnerId: string;

  tradeOwnerBookId: string;

}
