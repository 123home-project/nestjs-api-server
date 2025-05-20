import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortOrderType } from 'src/shared/types/sort-order.type';
import { HitterStatType } from '../types/hitter-stat.type';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PlayerHitterStatsReq {
  @ApiPropertyOptional({ description: '기록 년도', default: '현재 년도도' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  year?: number = new Date().getFullYear();

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

  @ApiPropertyOptional({ description: '정렬 기록', default: 'avg', enum: HitterStatType })
  @IsEnum(HitterStatType)
  @IsOptional()
  sortBy: HitterStatType = 'avg';

  @ApiPropertyOptional({ description: '정렬 기준', enum: SortOrderType })
  @IsEnum(SortOrderType)
  @IsOptional()
  sortOrder?: SortOrderType;
}
