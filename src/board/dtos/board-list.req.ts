import { IsEnum, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BoardType } from '../types/board.type';
import { BoardFiterType } from '../types/board-filter.type';
import { Transform } from 'class-transformer';

export class BoardListReq {
  @ApiProperty({ description: '게시판 필터', default: 'none' })
  @IsOptional()
  @IsEnum(BoardFiterType)
  boardFilterType: BoardFiterType = 'none';

  @ApiPropertyOptional({ description: '게시판 태그 id' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  boardTagId: number;

  @ApiPropertyOptional({ description: '검색 키워드' })
  @IsOptional()
  @IsString()
  @MinLength(0)
  keyword: string;

  @ApiPropertyOptional({ description: '게시판 타입', default: 'free' })
  @IsOptional()
  @IsEnum(BoardType)
  boardType: BoardType = 'free';

  @ApiPropertyOptional({ description: '보여줄 개수', default: 100 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit: number = 100;

  @ApiPropertyOptional({ description: '시작 번호', default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset?: number = 0;
}
