import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TeamHistory } from './team-history.entity';
import { TeamStat } from './team-stat.entity';
import { PlayerHitterStat } from 'src/player/entities/player-hitter-stat.entity';
import { PlayerPitcherStat } from 'src/player/entities/player-pitcher-stat.entity';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  logo: string;

  @Column({ type: 'int', name: 'establishment_year' })
  establishmentYear: number;

  @OneToMany(() => TeamHistory, (teamHistory) => teamHistory.team, { cascade: true })
  teamHistory?: TeamHistory[];

  @OneToMany(() => TeamStat, (teamStat) => teamStat.team, { cascade: true })
  teamStat?: TeamStat[];

  @OneToMany(() => PlayerHitterStat, (playerHitterStat) => playerHitterStat.team, { cascade: true })
  playerHitterStat?: PlayerHitterStat[];

  @OneToMany(() => PlayerPitcherStat, (playerPitcherStat) => playerPitcherStat.team, { cascade: true })
  playerPitcherStat?: PlayerPitcherStat[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
