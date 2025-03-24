import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PlayerHitterStat } from './player-hitter-stat.entity';

@Entity('player_hitter_first_team')
export class PlayerHitterFirstTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PlayerHitterStat, (playerHitterStat) => playerHitterStat.playerHitterFirstTeam, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'player_hitter_stat_id' })
  playerHitterStat: PlayerHitterStat;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
