import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Player } from '../../player/entities/player.entity';
import { TeamHistory } from './team-history.entity';
import { TeamStat } from './team-stat.entity';

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

  @OneToMany(() => Player, (player) => player.team, { cascade: true })
  player?: Player[];

  @OneToMany(() => TeamHistory, (teamHistory) => teamHistory.team, { cascade: true })
  teamHistory?: TeamHistory[];

  @OneToMany(() => TeamStat, (teamStat) => teamStat.team, { cascade: true })
  teamStat?: TeamStat[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
