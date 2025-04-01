import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamSchedule } from './team-schedule.entity';
import { PredictionPlayer } from 'src/prediction/entities/prediction_player.entity';
import { PlayerPitcherStat } from 'src/player/entities/player-pitcher-stat.entity';

@Entity('team_schedule_pitcher')
export class TeamSchedulePitcher {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamSchedule, (teamSchedule) => teamSchedule.teamScheduleHitter, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'team_schedule_id' })
  teamSchedule: TeamSchedule;

  @ManyToOne(() => PlayerPitcherStat, (playerPitcherStat) => playerPitcherStat.teamSchedulePitcher, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'player_pitcher_stat_id' })
  playerPitcherStat: PlayerPitcherStat;

  @Column({ type: 'tinyint', nullable: true })
  win: number;

  @Column({ type: 'float', nullable: true })
  inning: number;

  @Column({ name: 'hits_allowed', type: 'int', nullable: true })
  hitsAllowed: number;

  @Column({ name: 'runs_allowed', type: 'int', nullable: true })
  runsAllowed: number;

  @Column({ type: 'int', nullable: true })
  er: number;

  @Column({ type: 'tinyint', nullable: true })
  save: number;

  @Column({ type: 'tinyint', nullable: true })
  hold: number;

  @Column({ name: 'walks_allowed', type: 'int', nullable: true })
  walksAllowed: number;

  @Column({ name: 'homerun_allowed', type: 'int', nullable: true })
  homerunAllowed: number;

  @Column({ name: 'strike_out', type: 'int', nullable: true })
  strikeOut: number;

  @Column({ type: 'int', nullable: true })
  bf: number;

  @Column({ type: 'int', nullable: true })
  np: number;

  @OneToMany(() => PredictionPlayer, (predictionPlayer) => predictionPlayer.teamSchedulePitcher, { cascade: true })
  predictionPlayer?: PredictionPlayer[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
