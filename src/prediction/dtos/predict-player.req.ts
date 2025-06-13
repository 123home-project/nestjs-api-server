import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PredictPlayerReq {
  @ApiProperty({ description: '타자 id', example: 123 })
  @IsNumber()
  @IsOptional()
  playerHitterStatId?: number;

  @ApiProperty({ description: '투수 id', example: 123 })
  @IsNumber()
  @IsOptional()
  playerPitcherStatId?: number;

  @ApiProperty({ description: '예측 일자', example: '2025-05-05' })
  @IsDateString()
  predictionDate: string;
}
