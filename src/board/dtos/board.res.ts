import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BoardType } from '../types/board.type';
import { Expose, Type } from 'class-transformer';
import { UserRes } from 'src/user/dtos/user.res';
import { BoardTagDto } from './board-tag.dto';
import { BoardLikeRes } from './board-like.res';
import { BoardCommentRes } from './board-comment.res';

export class BoardRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserRes)
  @IsOptional()
  @Expose()
  user?: UserRes;

  @ValidateNested()
  @Type(() => BoardTagDto)
  @IsOptional()
  @Expose()
  boardTag?: BoardTagDto;

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
  boardTypes: BoardType;

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

  @IsDate()
  @Expose()
  deletedAt?: Date;
}
