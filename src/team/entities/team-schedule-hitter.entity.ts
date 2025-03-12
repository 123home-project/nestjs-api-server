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

@Entity('team_schedule_hitter')
export class TeamScheduleHitter {
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

  @Column({ type: 'int', nullable: true })
  ab: number;

  @Column({ type: 'int', nullable: true })
  hits: number;

  @Column({ type: 'int', nullable: true })
  doubles: number;

  @Column({ type: 'int', nullable: true })
  triples: number;

  @Column({ type: 'int', nullable: true })
  homerun: number;

  @Column({ type: 'int', nullable: true })
  runs: number;

  @Column({ type: 'int', nullable: true })
  rbi: number;

  @Column({ type: 'int', nullable: true })
  strikeOuts: number;

  @Column({ type: 'int', nullable: true })
  sb: number;

  @OneToMany(() => PredictionPlayer, (predictionPlayer) => predictionPlayer.teamScheduleHitter, { cascade: true })
  predictionPlayer?: PredictionPlayer[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
