import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { UserAccount } from './user-account.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
import { Team } from 'src/team/entities/team.entity';
import { Report } from 'src/report/entities/report.entity';

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

  @ManyToOne(() => Team, (team) => team.user, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'favorite_team_id' })
  favoriteTeam?: Team;

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

  @OneToMany(() => Report, (report) => report.user, { cascade: true })
  report?: Report[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date;
}
