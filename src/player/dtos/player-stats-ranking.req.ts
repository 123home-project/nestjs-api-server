import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PlayerStatsRankingReq {
  @ApiPropertyOptional({ description: '기록 년도' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  year?: number = new Date().getFullYear();

  @ApiPropertyOptional({ description: '보여줄 개수' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit: number = 100;
}
