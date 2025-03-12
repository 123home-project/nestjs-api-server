import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity('team_stat')
export class TeamStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.teamStat, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int', nullable: true })
  win: number;

  @Column({ type: 'int', nullable: true })
  draw: number;

  @Column({ type: 'int', nullable: true })
  lose: number;

  @Column({ name: 'win_rate', type: 'float', nullable: true })
  winRate: number;

  @Column({ type: 'float', nullable: true })
  avg: number;

  @Column({ type: 'float', nullable: true })
  era: number;

  @Column({ type: 'float', nullable: true })
  ops: number;

  @Column({ name: 'strike_out', type: 'int', nullable: true })
  strikeOut: number;

  @Column({ type: 'int', nullable: true })
  homerun: number;

  @Column({ type: 'int', nullable: true })
  sb: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
