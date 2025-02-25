import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PlayerPitcherStat } from './player-pitcher-stat.entity';
import { PlayerHitterStat } from './player-hitter-stat.entity';

@Entity('player')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, type: 'varchar' })
  name: string;

  @Column({ type: 'date' })
  birth: Date;

  @Column({ length: 255, type: 'varchar', nullable: true })
  profile?: string;

  @OneToMany(() => PlayerPitcherStat, (playerPitcherStat) => playerPitcherStat.player, { cascade: true })
  playerPitcherStat?: PlayerPitcherStat[];

  @OneToMany(() => PlayerHitterStat, (playerHitterStat) => playerHitterStat.player, { cascade: true })
  playerHitterStat?: PlayerHitterStat[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
