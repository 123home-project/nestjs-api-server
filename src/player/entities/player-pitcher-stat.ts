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

@Entity('player_pitcher_stat')
export class PlayerPitcherStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.playerPitcherStat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'float', nullable: true })
  era?: number;

  @Column({ type: 'int', nullable: true })
  gameCount?: number;

  @Column({ type: 'float', nullable: true })
  inning?: number;

  @Column({ type: 'int', nullable: true })
  win?: number;

  @Column({ type: 'int', nullable: true })
  draw?: number;

  @Column({ type: 'int', nullable: true })
  lose?: number;

  @Column({ type: 'int', nullable: true })
  save?: number;

  @Column({ type: 'int', nullable: true })
  hold?: number;

  @Column({ type: 'int', nullable: true })
  strikeOut?: number;

  @Column({ type: 'float', nullable: true })
  baa?: number;

  @Column({ type: 'int', nullable: true })
  walksAllowed?: number;

  @Column({ type: 'int', nullable: true })
  homerunsAllowed?: number;

  @Column({ type: 'float', nullable: true })
  winningRate?: number;

  @Column({ type: 'float', nullable: true })
  whip?: number;

  @Column({ type: 'float', nullable: true })
  war?: number;

  @Column({ type: 'float', nullable: true })
  k9?: number;

  @Column({ type: 'float', nullable: true })
  bb9?: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
