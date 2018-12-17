import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

import { UserEntity } from './user.entity';
import {
  UserForLoginDTO,
  UserForRegisterDTO,
} from './user.dto';
import { BookEntity } from '../book/book.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  // ? SHOW ALL
  async showAll(userId: string) {
    const users = await this.userRepository.find({
      where: {id: Not(userId)},
      relations: ['books'],
    });

    return users.map(user => user.userToRO(true, false));
  }

  // ! REGISTER
  async register(data: UserForRegisterDTO) {
    const { username } = data;
    let user = await this.userRepository.findOne({
      where: { username },
    });

    if (user) {
      throw new HttpException(
        'User with this name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    user = await this.userRepository.create(data);
    await this.userRepository.save(user);

    return HttpStatus.CREATED;
  }

  // ! LOGIN
  async login(data: UserForLoginDTO) {
    const { username, password } = data;
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['books'],
    });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user.userToRO(true, true);
  }
}
