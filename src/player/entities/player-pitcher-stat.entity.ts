import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Player } from './player.entity';
import { Team } from 'src/team/entities/team.entity';
import { PlayerPitcherFirstTeam } from './player-pitcher-first-team.entity';
import { TeamSchedulePitcher } from 'src/team/entities/team-schedule-pitcher.entity';

@Entity('player_pitcher_stat')
export class PlayerPitcherStat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.playerPitcherStat, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Team, (team) => team.playerPitcherStat, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @OneToOne(() => PlayerPitcherFirstTeam, (playerFirstTeam) => playerFirstTeam.playerPitcherStat, {
    cascade: true,
  })
  playerPitcherFirstTeam: PlayerPitcherFirstTeam;

  @OneToMany(() => TeamSchedulePitcher, (teamSchedulePitcher) => teamSchedulePitcher.playerPitcherStat, {
    cascade: true,
  })
  teamSchedulePitcher?: TeamSchedulePitcher[];

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  era?: string;

  @Column({ name: 'game_count', type: 'int', nullable: true })
  gameCount?: number;

  @Column({ type: 'decimal', precision: 7, scale: 1, nullable: true })
  inning?: string;

  @Column({ type: 'int', nullable: true })
  win?: number;

  @Column({ type: 'int', nullable: true })
  lose?: number;

  @Column({ type: 'int', nullable: true })
  save?: number;

  @Column({ type: 'int', nullable: true })
  hold?: number;

  @Column({ name: 'strike_out', type: 'int', nullable: true })
  strikeOut?: number;

  @Column({ type: 'decimal', precision: 4, scale: 3, nullable: true })
  baa?: string;

  @Column({ name: 'walks_allowed', type: 'int', nullable: true })
  walksAllowed?: number;

  @Column({ name: 'homeruns_allowed', type: 'int', nullable: true })
  homerunsAllowed?: number;

  @Column({ name: 'winning_rate', type: 'decimal', precision: 4, scale: 3, nullable: true })
  winningRate?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  whip?: string;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  k9?: string;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  bb9?: string;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  war?: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
