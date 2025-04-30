import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BoardType } from '../types/board.type';
import { Expose, Type } from 'class-transformer';
import { BoardTagRes } from './board-tag.res';

class UserDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  nickname: string;
}

export class BoardListRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserDto)
  @IsOptional()
  @Expose()
  user?: UserDto;

  @ValidateNested()
  @Type(() => BoardTagRes)
  @IsOptional()
  @Expose()
  boardTag?: BoardTagRes;

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

  @IsNumber()
  @Expose()
  boardCommentCount: number;

  @IsNumber()
  @Expose()
  boardLikeCount: number;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
