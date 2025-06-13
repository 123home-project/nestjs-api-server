import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TeamStatsRes {
  @ApiProperty({ description: '팀 명', example: '안녕' })
  @Expose()
  name: string;

  @ApiProperty({ description: '팀 로고', example: 'https://example.com/profile.png' })
  @Expose()
  logo: string;

  @ApiProperty({ description: '경기 수', example: 22 })
  @Expose()
  gameCount: number;

  @ApiProperty({ description: '승', example: 10 })
  @Expose()
  win: number;

  @ApiProperty({ description: '무', example: 5 })
  @Expose()
  draw: number;

  @ApiProperty({ description: '패', example: 7 })
  @Expose()
  lose: number;

  @ApiProperty({ description: '승률', example: 0.563 })
  @Expose()
  winRate: number;

  @ApiProperty({ description: '타율', example: 0.365 })
  @Expose()
  avg: number;

  @ApiProperty({ description: '평균자책점', example: 2.55 })
  @Expose()
  era: number;

  @ApiProperty({ description: '출루율 + 장타율', example: 1.002 })
  @Expose()
  ops: number;

  @ApiProperty({ description: '삼진', example: 105 })
  @Expose()
  strikeOut: number;

  @ApiProperty({ description: '홈런', example: 14 })
  @Expose()
  homerun: number;

  @ApiProperty({ description: '도루', example: 23 })
  @Expose()
  sb: number;

  @ApiProperty({ description: '득점 생산력', example: 123.3 })
  @Expose()
  wrcPlus: number;
}
