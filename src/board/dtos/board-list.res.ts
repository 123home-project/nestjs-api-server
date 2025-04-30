import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BoardType } from '../types/board.type';
import { Expose, Type } from 'class-transformer';

class UserDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  nickname: string;
}

class BoardTagDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;
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
