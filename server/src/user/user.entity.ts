import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserForReturnDTO } from './user.dto';
import { BookEntity } from 'src/book/book.entity';

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

  toResponseObject(showToken: boolean = true): UserForReturnDTO {
    const { id, created, username, token } = this;
    const responseObject: UserForReturnDTO = {
      id,
      created,
      username,
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, username } = this;

    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '1h' },
    );
  }
}
