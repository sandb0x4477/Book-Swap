import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserForLoginDTO, UserForRegisterDTO, UserForReturnDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // ? SHOW ALL
  async showAll() {
    const users = await this.userRepository.find();

    return users.map(user => user.toResponseObject(false));
    // return users;
  }

  // ! REGISTER
  async register(data: UserForRegisterDTO) {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('User with this name already exists', HttpStatus.BAD_REQUEST);
    }

    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    // return user;
    // return HttpStatus.CREATED;
    return user.toResponseObject();
  }

  // ! LOGIN
  async login(data: UserForLoginDTO) {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user.toResponseObject();

  }

}
