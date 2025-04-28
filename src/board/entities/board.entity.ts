import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardType } from '../types/board.type';
import { BoardTag } from './board-tag.entity';
import { BoardComment } from './board-comment.entity';
import { BoardLike } from './board-like.entity';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.board, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => BoardTag, (boardTag) => boardTag.board, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'board_tag_id' })
  boardTag: BoardTag;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  contents: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ name: 'board_type', type: 'varchar', length: 45 })
  boardTypes: BoardType;

  @OneToMany(() => BoardComment, (boardComment) => boardComment.board, { cascade: true })
  boardComment?: BoardComment[];

  @OneToMany(() => BoardLike, (boardLike) => boardLike.board, { cascade: true })
  boardLike?: BoardLike[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date;
}
