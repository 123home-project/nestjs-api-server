import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BoardType } from '../types/board.type';
import { Expose, Type } from 'class-transformer';
import { BoardRes } from './board.res';

export class BoardTagRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => BoardRes)
  @IsOptional()
  @Expose()
  board?: BoardRes[];

  @IsString()
  @Expose()
  name: string;

  @IsEnum(BoardType)
  @Expose()
  tagType: BoardType;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
