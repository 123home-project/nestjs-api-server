import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortOrderType } from 'src/shared/types/sort-order.type';

import { PredictionHitterStatType } from '../types/prediction-hitter-stat.type';

export class PlayerPredictionHitterReq {
  @ApiPropertyOptional({ description: '예측 년도', default: '현재 년도' })
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

  @ApiPropertyOptional({ description: '정렬 기록', default: 'avg', enum: PredictionHitterStatType })
  @IsEnum(PredictionHitterStatType)
  @IsOptional()
  sortBy?: PredictionHitterStatType = 'avg';

  @ApiPropertyOptional({ description: '정렬 기준', enum: SortOrderType })
  @IsEnum(SortOrderType)
  @IsOptional()
  sortOrder?: SortOrderType;

  @ApiPropertyOptional({ description: '검색 닉네임' })
  @IsString()
  @IsOptional()
  nickname?: string;
}
