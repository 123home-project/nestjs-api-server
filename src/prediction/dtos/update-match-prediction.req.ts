import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GameResultType } from 'src/team/types/game-result.type';

export class UpdateMatchPredictionReq {
  @ApiProperty({ description: '팀 스케줄 id', example: 123 })
  @IsNumber()
  teamScheduleId: number;

  @ApiProperty({ description: '예측', example: 'win', enum: GameResultType })
  @IsEnum(GameResultType)
  prediction: GameResultType;
}
