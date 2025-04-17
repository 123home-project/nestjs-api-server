import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlayerPredictionReq {
  @ApiProperty({ description: '타자 id' })
  @IsNumber()
  @IsOptional()
  playerHitterStatId?: number;

  @ApiProperty({ description: '투수 id' })
  @IsNumber()
  @IsOptional()
  playerPitcherStatId?: number;

  @ApiProperty({ description: '예측 일자' })
  @IsDateString()
  predictionDate: string;
}
