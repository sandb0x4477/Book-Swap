import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BookEntity } from 'src/book/book.entity';

@Entity('trades')
export class TradeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text', nullable: true})
  tradeStatus: string;

  // ? Trade owner
  @Column({ nullable: true })
  tradeOwnerId: string;

  @ManyToOne(type => UserEntity)
  tradeOwner: UserEntity;

  // ? Trade owner book
  @ManyToOne(type => BookEntity)
  tradeOwnerBook: BookEntity;

  @Column({ nullable: true })
  tradeOwnerBookId: string;

  // ! Target User
  @Column({ nullable: true })
  targetUserId: string;

  @ManyToOne(type => UserEntity)
  targetUser: UserEntity;

  // ! Target User Book
  @Column({ nullable: true })
  targetBookId: string;

  @ManyToOne(type => BookEntity)
  targetBook: BookEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
