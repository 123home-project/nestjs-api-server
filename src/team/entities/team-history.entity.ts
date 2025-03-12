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

@Entity('team_history')
export class TeamHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.teamHistory, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ type: 'int' })
  year: number;

  @Column({ length: 255, type: 'varchar' })
  logo: string;

  @Column({ type: 'int' })
  ranking: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
