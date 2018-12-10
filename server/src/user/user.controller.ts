import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../shared/auth.gaurd';
import { ValidationPipe } from './../shared/validation.pipe';
import { UserService } from './user.service';
import { UserForLoginDTO, UserForRegisterDTO } from './user.dto';
import { User } from './user.decorator';

@Controller('api/')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  @UseGuards(new AuthGuard())
  showAllUsers(@User('id') user) {
    return this.userService.showAll(user);
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
