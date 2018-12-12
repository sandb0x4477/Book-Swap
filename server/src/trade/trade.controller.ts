import { Controller, Get, UseGuards, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';

import { User } from 'src/user/user.decorator';
import { TradeService } from './trade.service';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { TradeForCreation } from './trade.dto';

@Controller('api/trades')
export class TradeController {

  constructor(private tradeService: TradeService) {}

  @Get()
  @UseGuards(new AuthGuard())
  showBooksForUser(@User('id') user) {
    return this.tradeService.showAllTradesForUser(user);
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createTrade(@User('id') user, @Body() body: TradeForCreation) {
    return this.tradeService.createTrade(user, body);
  }
}
