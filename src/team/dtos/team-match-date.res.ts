import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameResultType } from '../types/game-result.type';
import { TeamScoreRes } from './team-score.res';

export class TeamMatchDto {
  @ApiProperty({ description: '팀 스케줄 아이디', example: 123 })
  @Expose()
  teamScheduleId: number;

  @ApiProperty({ description: '홈 팀', example: 123 })
  @Expose()
  homeTeam: TeamScoreRes;

  @ApiProperty({ description: '원정 팀', example: 123 })
  @Expose()
  awayTeam: TeamScoreRes;

  @ApiPropertyOptional({ description: '결과', example: 'win', enum: GameResultType })
  @Expose()
  result?: GameResultType;
}

export class TeamMatchDateRes {
  @ApiProperty({ description: '일자', example: '2025-05-05' })
  @Expose()
  date: string;

  @ApiProperty({ description: '경기 리스트', type: [TeamMatchDto] })
  @Expose()
  match: TeamMatchDto[];
}
