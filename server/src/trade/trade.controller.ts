import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Delete,
  Param,
  Put,
  Patch,
} from '@nestjs/common';

import { User } from '../user/user.decorator';
import { TradeService } from './trade.service';
import { AuthGuard } from '../shared/auth.gaurd';
import { TradeForCreation, TradeForUpdate } from './trade.dto';
import { UserEntity } from '../user/user.entity';
import { TradeEntity } from './trade.entity';

@Controller('api/trades')
export class TradeController {
  constructor(private tradeService: TradeService) {}

  // // ! SHOW ALL TRADES
  // @Get()
  // @UseGuards(new AuthGuard())
  // showAllTrades(@User('id') user: string) {
  //   return this.tradeService.showAllTrades(user);
  // }

  @Get('/requested')
  @UseGuards(new AuthGuard())
  showRequestedTrades(@User('id') user: string) {
    return this.tradeService.showRequestedTrades(user);
  }

  @Get('/pending')
  @UseGuards(new AuthGuard())
  showPendingTrades(@User('id') user: string) {
    return this.tradeService.showPendingTrades(user);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  updateTrade(
    @Param('id') id: string,
    @User('id') user: string,
    @Body() body: any,
  ) {
    return this.tradeService.updateTrade(id, user, body);
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createTrade(@User('id') user: string, @Body() body: TradeForCreation) {
    return this.tradeService.createTrade(user, body);
  }

  // ! DELETE
  @Delete(':id')
  @UseGuards(new AuthGuard())
  deleteTrade(@User('id') user: string, @Param('id') id: string) {
    return this.tradeService.deleteTrade(user, id);
  }
}
