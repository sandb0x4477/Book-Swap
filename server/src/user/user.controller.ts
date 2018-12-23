import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';

import { AuthGuard } from '../shared/auth.gaurd';
import { ValidationPipe } from './../shared/validation.pipe';
import { UserService } from './user.service';
import { UserForLoginDTO, UserForRegisterDTO } from './user.dto';
import { User } from './user.decorator';

@Controller('apibs/')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users/:id')
  @UseGuards(new AuthGuard())
  showUserAddress(@Param('id') userId: string, @User('id') user: string) {
    return this.userService.showUserAddress(userId, user);
  }

  @Get('users')
  @UseGuards(new AuthGuard())
  showAll(@User('id') userId: string) {
    return this.userService.showAll(userId);
  }

  @Post('auth/register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserForRegisterDTO) {
    return this.userService.register(data);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserForLoginDTO) {
    return this.userService.login(data);
  }
}
