import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { PitcherStatType } from '../types/pitcher-stat.type';
import { SortOrderType } from 'src/shared/types/sort-order.type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlayerPitcherStatsReq {
  @ApiPropertyOptional({ description: '기록 년도', default: '현재 년도' })
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

  @ApiPropertyOptional({ description: '정렬 기록', default: 'era', enum: PitcherStatType })
  @IsEnum(PitcherStatType)
  @IsOptional()
  sortBy: PitcherStatType = 'era';

  @ApiProperty({ description: '정렬 기준', enum: SortOrderType })
  @IsEnum(SortOrderType)
  @IsOptional()
  sortOrder?: SortOrderType;
}
