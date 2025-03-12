import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { UserAccount } from './user-account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PredictionVictory } from 'src/prediction/entities/prediction_victory.entity';
import { PredictionPlayer } from 'src/prediction/entities/prediction_player.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @OneToOne(() => UserAccount, (userAccount) => userAccount.user, { cascade: true })
  userAccount: UserAccount;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, { cascade: true })
  refreshToken?: RefreshToken[];

  @OneToMany(() => PredictionVictory, (predictionVictory) => predictionVictory.user, { cascade: true })
  predictionVictory?: PredictionVictory[];

  @OneToMany(() => PredictionPlayer, (predictionPlayer) => predictionPlayer.user, { cascade: true })
  predictionPlayer?: PredictionPlayer[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
