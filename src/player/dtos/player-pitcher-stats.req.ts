import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { PitcherStatType } from '../types/pitcher-stat.type';
import { SortOrderType } from 'src/shared/types/sort-order.type';

export class PlayerPitcherStatsReq {
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

  @IsEnum(PitcherStatType)
  @IsOptional()
  sortBy: PitcherStatType = 'era';

  @IsEnum(SortOrderType)
  @IsOptional()
  sortOrder?: SortOrderType;
}
