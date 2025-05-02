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
import { PredictionMatch } from 'src/prediction/entities/prediction_match.entity';
import { PredictionPlayer } from 'src/prediction/entities/prediction_player.entity';
import { Board } from 'src/board/entities/board.entity';
import { BoardComment } from 'src/board/entities/board-comment.entity';
import { BoardLike } from 'src/board/entities/board-like.entity';
import { YoutubeBaseball } from 'src/youtube/entities/youtube-baseball.entity';

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

  @OneToMany(() => PredictionMatch, (predictionMatch) => predictionMatch.user, { cascade: true })
  predictionMatch?: PredictionMatch[];

  @OneToMany(() => PredictionPlayer, (predictionPlayer) => predictionPlayer.user, { cascade: true })
  predictionPlayer?: PredictionPlayer[];

  @OneToMany(() => Board, (board) => board.user, { cascade: true })
  board?: Board[];

  @OneToMany(() => BoardComment, (boardComment) => boardComment.user, { cascade: true })
  boardComment?: BoardComment[];

  @OneToMany(() => BoardComment, (boardComment) => boardComment.tagUser, { cascade: true })
  boardCommentTag?: BoardComment[];

  @OneToMany(() => BoardLike, (boardLike) => boardLike.user, { cascade: true })
  boardLike?: BoardLike[];

  @OneToMany(() => YoutubeBaseball, (youtubeBaseball) => youtubeBaseball.user, { cascade: true })
  youtubeBaseball?: YoutubeBaseball[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
