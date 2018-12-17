import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BookEntity } from '../book/book.entity';

@Entity('trades')
export class TradeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text', nullable: true})
  tradeStatus: string;

  // ? Trade owner
  @Column({ nullable: true })
  tradeOwnerId: string;

  @ManyToOne(type => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tradeOwner: UserEntity;

  // ? Trade owner book
  @ManyToOne(type => BookEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tradeOwnerBook: BookEntity;

  @Column({ nullable: true })
  tradeOwnerBookId: string;

  // ! Target User
  @Column({ nullable: true })
  targetUserId: string;

  @ManyToOne(type => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  targetUser: UserEntity;

  // ! Target User Book
  @Column({ nullable: true })
  targetBookId: string;

  @ManyToOne(type => BookEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  targetBook: BookEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  // tradeToRO() {
  //   const { id, created, updated, tradeOwnerId, tradeStatus, tradeOwnerBookId }
  //   return {
  //     id: trade.id,
  //     created: trade.created,
  //     updated: trade.updated,
  //     tradeOwnerId: trade.tradeOwnerId,
  //     tradeStatus: trade.tradeStatus,
  //     tradeOwnerBookId: trade.tradeOwnerBookId,
  //     targetBook: trade.targetBook,
  //     targetUser: trade.targetUser.userToROShort(),
  //   };
  // }
}
