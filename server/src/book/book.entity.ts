import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity('books')
export class BookEntity {
  @PrimaryColumn({
    type: 'text',
  })
  id: string;

  @Column('text')
  title: string;

  @Column('simple-array')
  authors: string[];

  @Column('text')
  description: string;

  @Column('text')
  imageUrl: string;

  @CreateDateColumn()
  created: Date;

  // @ManyToOne(type => UserEntity, user => user.books)
  // user: UserEntity;

  @ManyToOne(type => UserEntity)
  user: UserEntity;
}
