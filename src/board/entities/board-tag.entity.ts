import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BoardType } from '../types/board.type';
import { Board } from './board.entity';

@Entity('board_tag')
export class BoardTag {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Board, (board) => board.boardTag, {
    cascade: true,
  })
  board: Board;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ name: 'tag_type', type: 'varchar', length: 45 })
  tagTypes: BoardType;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
