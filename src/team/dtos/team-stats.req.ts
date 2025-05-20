import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { TeamStatsType } from '../types/team-stats.type';
import { SortOrderType } from 'src/shared/types/sort-order.type';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TeamStatsReq {
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

  @ApiPropertyOptional({ description: '시작 숫자', default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset?: number = 0;

  @ApiPropertyOptional({ description: '정렬 기록', default: 'winRate', enum: TeamStatsType })
  @IsEnum(TeamStatsType)
  @IsOptional()
  sortBy: TeamStatsType = 'winRate';

  @ApiPropertyOptional({ description: '정렬 기준', default: 'DESC', enum: SortOrderType })
  @IsEnum(SortOrderType)
  @IsOptional()
  sortOrder: SortOrderType = 'DESC';
}
