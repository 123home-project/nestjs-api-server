import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortOrderType } from 'src/shared/types/sort-order.type';
import { HitterStatType } from '../types/hitter-stat.type';

export class PlayerHitterStatsReq {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  year?: number = new Date().getFullYear();

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit: number = 100;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset?: number = 0;

  @IsEnum(HitterStatType)
  @IsOptional()
  sortBy: HitterStatType = 'avg';

  @IsEnum(SortOrderType)
  @IsOptional()
  sortOrder?: SortOrderType;
}
