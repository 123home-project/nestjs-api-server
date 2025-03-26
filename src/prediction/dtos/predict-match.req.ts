import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GameResultType } from 'src/team/types/game-result.type';

export class PredictMatchReq {
  @ApiProperty({ description: '팀 스케줄 id' })
  @IsNumber()
  teamScheduleId: number;

  @ApiProperty({ description: '예측', enum: GameResultType })
  @IsEnum(GameResultType)
  prediction: GameResultType;
}
