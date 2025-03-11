import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TeamStatsRes {
  @ApiProperty({ description: '팀 명' })
  @Expose()
  name: string;

  @ApiProperty({ description: '팀 로고고' })
  @Expose()
  logo: string;

  @ApiProperty({ description: '경기 수' })
  @Expose()
  gameCount: number;

  @ApiProperty({ description: '승' })
  @Expose()
  win: number;

  @ApiProperty({ description: '무' })
  @Expose()
  draw: number;

  @ApiProperty({ description: '패' })
  @Expose()
  lose: number;

  @ApiProperty({ description: '승률' })
  @Expose()
  winRate: number;

  @ApiProperty({ description: '타율' })
  @Expose()
  avg: number;

  @ApiProperty({ description: '평균자책점' })
  @Expose()
  era: number;

  @ApiProperty({ description: '출루율 + 장타율' })
  @Expose()
  ops: number;

  @ApiProperty({ description: '삼진' })
  @Expose()
  strikeOut: number;

  @ApiProperty({ description: '홈런' })
  @Expose()
  homerun: number;

  @ApiProperty({ description: '도루' })
  @Expose()
  sb: number;

  @ApiProperty({ description: '득점 생산력' })
  @Expose()
  wrcPlus: number;
}
