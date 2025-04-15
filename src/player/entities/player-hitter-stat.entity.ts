import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Player } from './player.entity';
import { Team } from 'src/team/entities/team.entity';
import { PlayerHitterFirstTeam } from './player-hitter-first-team.entity';
import { TeamScheduleHitter } from 'src/team/entities/team-schedule-hitter.entity';
import { PredictionPlayer } from 'src/prediction/entities/prediction_player.entity';

@Entity('player_hitter_stat')
export class PlayerHitterStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.playerHitterStat, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Team, (team) => team.playerHitterStat, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @OneToOne(() => PlayerHitterFirstTeam, (playerHitterFirstTeam) => playerHitterFirstTeam.playerHitterStat, {
    cascade: true,
  })
  playerHitterFirstTeam: PlayerHitterFirstTeam;

  @OneToMany(() => TeamScheduleHitter, (teamScheduleHitter) => teamScheduleHitter.playerHitterStat, {
    cascade: true,
  })
  teamScheduleHitter?: TeamScheduleHitter[];

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'decimal', precision: 4, scale: 3, nullable: true })
  avg?: string;

  @Column({ name: 'game_count', type: 'int', nullable: true })
  gameCount?: number;

  @Column({ type: 'int', nullable: true })
  pa?: number;

  @Column({ type: 'int', nullable: true })
  ab?: number;

  @Column({ type: 'decimal', precision: 4, scale: 3, nullable: true })
  obp?: string;

  @Column({ type: 'decimal', precision: 4, scale: 3, nullable: true })
  slg?: string;

  @Column({ type: 'decimal', precision: 4, scale: 3, nullable: true })
  ops?: string;

  @Column({ name: 'wrc_plus', type: 'decimal', precision: 5, scale: 1, nullable: true })
  wrcPlus?: string;

  @Column({ type: 'int', nullable: true })
  hits?: number;

  @Column({ type: 'int', nullable: true })
  doubles?: number;

  @Column({ type: 'int', nullable: true })
  triples?: number;

  @Column({ type: 'int', nullable: true })
  homerun?: number;

  @Column({ type: 'int', nullable: true })
  walks?: number;

  @Column({ type: 'int', nullable: true })
  sb?: number;

  @Column({ type: 'int', nullable: true })
  rbi?: number;

  @Column({ type: 'int', nullable: true })
  runs?: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  war?: string;

  @OneToMany(() => PredictionPlayer, (predictionPlayer) => predictionPlayer.playerHitterStat, { cascade: true })
  predictionPlayer?: PredictionPlayer[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
