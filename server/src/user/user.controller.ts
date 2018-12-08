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

@Controller('api/')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('auth/users')
  @UseGuards(new AuthGuard())
  showAllUsers() {
    return this.userService.showAll();
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
