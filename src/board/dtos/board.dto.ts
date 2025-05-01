import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BoardType } from '../types/board.type';
import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user/dtos/user.dto';
import { BoardTagDto } from './board-tag.dto';
import { BoardLikeRes } from './board-like.res';
import { BoardCommentDto } from './board-comment.dto';

export class BoardDto {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserDto)
  @IsOptional()
  @Expose()
  user?: UserDto;

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
  @Type(() => BoardCommentDto)
  @IsOptional()
  @Expose()
  boardComment?: BoardCommentDto[];

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
