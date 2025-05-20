import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BoardType } from '../types/board.type';
import { Expose, Type } from 'class-transformer';
import { BoardDto } from './board.dto';

export class BoardTagDto {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => BoardDto)
  @IsOptional()
  @Expose()
  board?: BoardDto[];

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
