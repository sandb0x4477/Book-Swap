import { Controller, Post, Body } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth/register')
  register(@Body() data: UserEntity) {
    return this.userService.register(data);
  }

  @Post('auth/login')
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }
}
