import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GameResultType } from 'src/team/types/game-result.type';
import { TeamScoreRes } from 'src/team/dtos/team-score.res';

export class MyMatchPredictionHistoryRes {
  @ApiProperty({ description: '승패예측 id' })
  @Expose()
  predictionMatchId: number;

  @ApiProperty({ description: '유저 id' })
  @Expose()
  userId: number;

  @ApiProperty({ description: '경기 일정 id' })
  @Expose()
  teamScheduleId: number;

  @ApiProperty({ description: '예측', enum: GameResultType })
  @Expose()
  prediction: GameResultType;

  @ApiProperty({ description: '경기 시작 시간' })
  @Expose()
  startDate: Date;

  @ApiProperty({ description: '결과', enum: GameResultType })
  @Expose()
  result: GameResultType;

  @ApiProperty({ description: '홈 팀', type: TeamScoreRes })
  @Expose()
  homeTeam: TeamScoreRes;

  @ApiProperty({ description: '원정 팀', type: TeamScoreRes })
  @Expose()
  awayTeam: TeamScoreRes;
}
