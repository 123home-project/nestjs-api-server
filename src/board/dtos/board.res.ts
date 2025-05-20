import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BoardUserRes } from './board-user.res';
import { BoardTagRes } from './board-tag.res';
import { BoardType } from '../types/board.type';
import { BoardCommentRes } from './board-comment.res';

export class BoardRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => BoardUserRes)
  @Expose()
  user: BoardUserRes;

  @ValidateNested()
  @Type(() => BoardTagRes)
  @Expose()
  boardTag: BoardTagRes;

  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  contents: string;

  @IsNumber()
  @Expose()
  views: number;

  @IsEnum(BoardType)
  @Expose()
  boardType: BoardType;

  @ValidateNested()
  @Type(() => BoardCommentRes)
  @IsOptional()
  @Expose()
  boardComment?: BoardCommentRes[];

  @IsNumber()
  @Expose()
  boardLikeCount: number;

  @IsNumber()
  @Expose()
  boardDislikeCount: number;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
