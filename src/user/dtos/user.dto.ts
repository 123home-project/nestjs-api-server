import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserAccountRes } from './user-account.res';
import { PredictionMatchRes } from 'src/prediction/dtos/prediction-match.res';
import { RefreshTokenRes } from 'src/auth/dtos/refresh-token.res';
import { PredictionPlayerRes } from 'src/prediction/dtos/prediction-player.res';
import { BoardDto } from 'src/board/dtos/board.dto';
import { BoardCommentDto } from 'src/board/dtos/board-comment.dto';
import { BoardLikeRes } from 'src/board/dtos/board-like.res';
import { YoutubeBaseballDto } from 'src/youtube/dtos/youtube-baseball.dto';
import { TeamDto } from 'src/team/dtos/team.dto';

export class UserDto {
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
  @Type(() => TeamDto)
  @IsOptional()
  @Expose()
  favoriteTeam?: TeamDto;

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
  @Type(() => BoardDto)
  @IsOptional()
  @Expose()
  board?: BoardDto[];

  @ValidateNested()
  @Type(() => BoardCommentDto)
  @IsOptional()
  @Expose()
  boardComment?: BoardCommentDto[];

  @ValidateNested()
  @Type(() => BoardLikeRes)
  @IsOptional()
  @Expose()
  boardLike?: BoardLikeRes[];

  @ValidateNested()
  @Type(() => YoutubeBaseballDto)
  @IsOptional()
  @Expose()
  youtubeBaseball?: YoutubeBaseballDto[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
