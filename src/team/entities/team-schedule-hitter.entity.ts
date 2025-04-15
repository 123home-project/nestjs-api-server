import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamSchedule } from './team-schedule.entity';
import { PlayerHitterStat } from 'src/player/entities/player-hitter-stat.entity';

@Entity('team_schedule_hitter')
export class TeamScheduleHitter {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamSchedule, (teamSchedule) => teamSchedule.teamScheduleHitter, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'team_schedule_id' })
  teamSchedule: TeamSchedule;

  @ManyToOne(() => PlayerHitterStat, (playerHitterStat) => playerHitterStat.teamScheduleHitter, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'player_hitter_stat_id' })
  playerHitterStat: PlayerHitterStat;

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
  walks: number;

  @Column({ type: 'int', nullable: true })
  runs: number;

  @Column({ type: 'int', nullable: true })
  rbi: number;

  @Column({ name: 'strike_out', type: 'int', nullable: true })
  strikeOut: number;

  @Column({ type: 'int', nullable: true })
  sb: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
