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
import { Team } from './team.entity';
import { GameResultType } from '../types/game-result.type';
import { TeamScheduleHitter } from './team-schedule-hitter.entity';
import { TeamSchedulePitcher } from './team-schedule-pitcher.entity';
import { PredictionVictory } from 'src/prediction/entities/prediction_victory.entity';

@Entity('team_schedule')
export class TeamSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.homeTeamSchedule, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'home_team_id' })
  homeTeam: Team;

  @ManyToOne(() => Team, (team) => team.awayTeamSchedule, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'away_team_id' })
  awayTeam: Team;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'int', nullable: true })
  homeTeamScore: number;

  @Column({ type: 'int', nullable: true })
  awayTeamScore: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  result: GameResultType;

  @OneToMany(() => TeamScheduleHitter, (teamScheduleHitter) => teamScheduleHitter.teamSchedule, { cascade: true })
  teamScheduleHitter?: TeamScheduleHitter[];

  @OneToMany(() => TeamSchedulePitcher, (teamSchedulePitcher) => teamSchedulePitcher.teamSchedule, { cascade: true })
  teamSchedulePitcher?: TeamSchedulePitcher[];

  @OneToMany(() => PredictionVictory, (predictionVictory) => predictionVictory.teamSchedule, { cascade: true })
  predictionVictory?: PredictionVictory[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
