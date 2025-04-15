import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PlayerHitterStat } from 'src/player/entities/player-hitter-stat.entity';
import { PlayerPitcherStat } from 'src/player/entities/player-pitcher-stat.entity';

@Entity('prediction_player')
export class PredictionPlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.predictionPlayer, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'prediction_date', type: 'date', nullable: false })
  predictionDate: Date;

  @ManyToOne(() => PlayerHitterStat, (playerHitterStat) => playerHitterStat.predictionPlayer, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'player_hitter_stat_id' })
  playerHitterStat: PlayerHitterStat;

  @ManyToOne(() => PlayerPitcherStat, (playerPitcherStat) => playerPitcherStat.predictionPlayer, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'player_pitcher_stat_id' })
  playerPitcherStat: PlayerPitcherStat;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
