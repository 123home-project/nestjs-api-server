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
import { PredictionMatch } from 'src/prediction/entities/prediction_match.entity';

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

  @Column({ name: 'start_date', type: 'datetime' })
  startDate: Date;

  @Column({ name: 'home_team_score', nullable: true })
  homeTeamScore: number;

  @Column({ name: 'away_team_score', type: 'int', nullable: true })
  awayTeamScore: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  result: GameResultType;

  @OneToMany(() => TeamScheduleHitter, (teamScheduleHitter) => teamScheduleHitter.teamSchedule, { cascade: true })
  teamScheduleHitter?: TeamScheduleHitter[];

  @OneToMany(() => TeamSchedulePitcher, (teamSchedulePitcher) => teamSchedulePitcher.teamSchedule, { cascade: true })
  teamSchedulePitcher?: TeamSchedulePitcher[];

  @OneToMany(() => PredictionMatch, (predictionMatch) => predictionMatch.teamSchedule, { cascade: true })
  predictionMatch?: PredictionMatch[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
