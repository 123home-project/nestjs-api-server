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
import { Player } from 'src/player/entities/player.entity';
import { TeamSchedule } from './team-schedule.entity';
import { PredictionPlayer } from 'src/prediction/entities/prediction_player.entity';

@Entity('team_schedule_pitcher')
export class TeamSchedulePitcher {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamSchedule, (teamSchedule) => teamSchedule.teamScheduleHitter, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'home_team_id' })
  teamSchedule: TeamSchedule;

  @ManyToOne(() => Player, (player) => player.teamScheduleHitter, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ type: 'float', nullable: true })
  inning: number;

  @Column({ type: 'int', nullable: true })
  hitsAllowed: number;

  @Column({ type: 'int', nullable: true })
  runsAllowed: number;

  @Column({ type: 'int', nullable: true })
  er: number;

  @Column({ type: 'int', nullable: true })
  walksAllowed: number;

  @Column({ type: 'int', nullable: true })
  homerunAllowed: number;

  @Column({ type: 'int', nullable: true })
  strikeOuts: number;

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
