import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserProfileReq {
  @ApiPropertyOptional({ description: '기록 년도' })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional({ description: '보여줄 개수' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  favoriteTeamId?: number;
}
