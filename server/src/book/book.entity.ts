import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  googleId: string;

  @Column('simple-array')
  authors: string[];

  @Column('text')
  description: string;

  @Column('text')
  imageUrl: string;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => UserEntity)
  user: UserEntity;
}
