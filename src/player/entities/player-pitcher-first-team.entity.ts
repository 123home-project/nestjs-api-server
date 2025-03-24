import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PlayerPitcherStat } from './player-pitcher-stat.entity';

@Entity('player_pitcher_first_team')
export class PlayerPitcherFirstTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PlayerPitcherStat, (playerPitcherStat) => playerPitcherStat.playerPitcherFirstTeam, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'player_pitcher_stat_id' })
  playerPitcherStat: PlayerPitcherStat;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
