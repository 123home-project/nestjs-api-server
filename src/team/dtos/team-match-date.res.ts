import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameResultType } from '../types/game-result.type';

export class TeamDto {
  @ApiProperty({ description: '팀 id' })
  @Expose()
  teamId: number;

  @ApiProperty({ description: '팀 로고' })
  @Expose()
  logo: string;

  @ApiProperty({ description: '팀 명' })
  @Expose()
  name: string;

  @ApiProperty({ description: '점수' })
  @Expose()
  score: number;
}

export class TeamMatchDto {
  @ApiProperty({ description: '팀 스케줄 아이디' })
  @Expose()
  teamScheduleId: number;

  @ApiProperty({ description: '홈 팀' })
  @Expose()
  homeTeam: TeamDto;

  @ApiProperty({ description: '원정 팀' })
  @Expose()
  awayTeam: TeamDto;

  @ApiPropertyOptional({ description: '결과' })
  @Expose()
  result?: GameResultType;
}

export class TeamMatchDateRes {
  @ApiProperty({ description: '일자' })
  @Expose()
  date: string;

  @ApiProperty({ description: '경기 리스트' })
  @Expose()
  match: TeamMatchDto[];
}
