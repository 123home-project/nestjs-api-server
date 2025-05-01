import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BoardType } from '../types/board.type';
import { Transform } from 'class-transformer';

export class PopularBoardListReq {
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

  @ApiPropertyOptional({ description: '기간', default: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  period?: number = 1;
}
