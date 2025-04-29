import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserAccountRes } from './user-account.res';
import { PredictionMatchRes } from 'src/prediction/dtos/prediction-match.res';
import { RefreshTokenRes } from 'src/auth/dtos/refresh-token.res';
import { PredictionPlayerRes } from 'src/prediction/dtos/prediction-player.res';
import { BoardRes } from 'src/board/dtos/board.res';
import { BoardCommentRes } from 'src/board/dtos/board-comment.res';
import { BoardLikeRes } from 'src/board/dtos/board-like.res';

export class UserRes {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  nickname: string;

  @IsString()
  @IsOptional()
  @Expose()
  name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  email?: string;

  @ValidateNested()
  @Type(() => UserAccountRes)
  @IsOptional()
  @Expose()
  userAccount?: UserAccountRes;

  @ValidateNested()
  @Type(() => RefreshTokenRes)
  @IsOptional()
  @Expose()
  refreshToken?: RefreshTokenRes[];

  @ValidateNested()
  @Type(() => PredictionMatchRes)
  @IsOptional()
  @Expose()
  predictionMatch?: PredictionMatchRes[];

  @ValidateNested()
  @Type(() => PredictionPlayerRes)
  @IsOptional()
  @Expose()
  predictionPlayer?: PredictionPlayerRes[];

  @ValidateNested()
  @Type(() => BoardRes)
  @IsOptional()
  @Expose()
  board?: BoardRes[];

  @ValidateNested()
  @Type(() => BoardCommentRes)
  @IsOptional()
  @Expose()
  boardComment?: BoardCommentRes[];

  @ValidateNested()
  @Type(() => BoardLikeRes)
  @IsOptional()
  @Expose()
  boardLike?: BoardLikeRes[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
