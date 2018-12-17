import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserForReturnDTO } from './user.dto';
import { BookEntity } from '../book/book.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  email: string;

  @Column('text')
  address: string;

  @Column('text')
  city: string;

  @OneToMany(type => BookEntity, book => book.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  books: BookEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  userToROShort() {
    const { id, username, city } = this;

    const responseObject = {
      id,
      username,
      city,
    };

    return responseObject;
  }

  userToRO(
    showBookCount: boolean = true,
    showToken: boolean = true,
  ): UserForReturnDTO {
    const { id, created, username, city, token, books } = this;
    let booksCount = 0;

    if (showBookCount) {
      books.forEach(element => {
        booksCount++;
      });
    }

    const responseObject: UserForReturnDTO = {
      id,
      created,
      username,
      city,
      booksCount,
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  // ? TOKEN
  private get token(): string {
    const { id, username } = this;

    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
