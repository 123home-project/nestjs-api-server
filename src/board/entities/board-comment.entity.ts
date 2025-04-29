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
import { Board } from './board.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('board_comment')
export class BoardComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (board) => board.boardComment, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @ManyToOne(() => User, (user) => user.boardComment, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.boardCommentTag, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tag_user_id' })
  tagUser?: User;

  @ManyToOne(() => BoardComment, (parentComment) => parentComment.reply, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment?: BoardComment;

  @OneToMany(() => BoardComment, (reply) => reply.parentComment, { cascade: true })
  reply?: BoardComment[];

  @Column({ type: 'varchar', length: 1000 })
  comment: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date;
}
