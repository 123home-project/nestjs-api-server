import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Player } from './player.entity';

@Entity('player_hitter_stat')
export class PlayerHitterStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.playerHitterStat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'float', nullable: true })
  avg?: number;

  @Column({ type: 'int', nullable: true })
  gameCount?: number;

  @Column({ type: 'int', nullable: true })
  pa?: number;

  @Column({ type: 'int', nullable: true })
  ab?: number;

  @Column({ type: 'float', nullable: true })
  obp?: number;

  @Column({ type: 'float', nullable: true })
  slg?: number;

  @Column({ type: 'int', nullable: true })
  hits?: number;

  @Column({ type: 'int', nullable: true })
  doubles?: number;

  @Column({ type: 'int', nullable: true })
  triples?: number;

  @Column({ type: 'int', nullable: true })
  homerun?: number;

  @Column({ type: 'float', nullable: true })
  ops?: number;

  @Column({ type: 'float', nullable: true })
  wrcPlus?: number;

  @Column({ type: 'int', nullable: true })
  walks?: number;

  @Column({ type: 'int', nullable: true })
  sb?: number;

  @Column({ type: 'int', nullable: true })
  rbi?: number;

  @Column({ type: 'int', nullable: true })
  runs?: number;

  @Column({ type: 'float', nullable: true })
  war?: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
