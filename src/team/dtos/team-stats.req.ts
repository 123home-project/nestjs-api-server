import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { TeamStatsType } from '../types/team-stats.type';
import { SortOrderType } from 'src/shared/types/sort-order.type';
import { Transform } from 'class-transformer';

export class TeamStatsReq {
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

  @IsEnum(TeamStatsType)
  @IsOptional()
  sortBy: TeamStatsType = 'winRate';

  @IsEnum(SortOrderType)
  @IsOptional()
  sortOrder: SortOrderType = 'DESC';
}
