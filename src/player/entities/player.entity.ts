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
import { Team } from '../../team/entities/team.entity';
import { PlayerPitcherStat } from './player-pitcher-stat';
import { PlayerHitterStat } from './player-hitter-stat';

@Entity('player')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, type: 'varchar' })
  name: string;

  @Column({ type: 'date' })
  birth: Date;

  @Column({ length: 255, type: 'varchar' })
  profile?: string;

  @ManyToOne(() => Team, (team) => team.player, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @OneToMany(() => PlayerPitcherStat, (playerPitcherStat) => playerPitcherStat.player, { cascade: true })
  playerPitcherStat?: PlayerPitcherStat[];

  @OneToMany(() => PlayerHitterStat, (playerHitterStat) => playerHitterStat.player, { cascade: true })
  playerHitterStat?: PlayerHitterStat[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
