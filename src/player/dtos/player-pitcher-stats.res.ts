import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerPitcherStatsRes {
  @ApiProperty({ description: '선수 id', example: 123 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '선수 이름', example: '안녕' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '선수 생년월일', example: '2025-05-05' })
  @IsDate()
  @Expose()
  birth: Date;

  @ApiPropertyOptional({ description: '선수 프로필 사진', example: 'https://example.com/profile.png' })
  @IsString()
  @IsOptional()
  @Expose()
  profile?: string;

  @ApiProperty({ description: '투수 기록 id', example: 123 })
  @IsNumber()
  @Expose()
  pitcherStatId: number;

  @ApiProperty({ description: '선수 기록 년도', example: 123 })
  @IsNumber()
  @Expose()
  year: number;

  @ApiProperty({ description: '평균 자책점', example: '2.55' })
  @IsString()
  @Expose()
  era: string;

  @ApiProperty({ description: '경기 수', example: '3' })
  @IsString()
  @Expose()
  gameCount: string;

  @ApiProperty({ description: '이닝', example: '12.1' })
  @IsString()
  @Expose()
  inning: string;

  @ApiProperty({ description: '승', example: '4' })
  @IsString()
  @Expose()
  win: string;

  @ApiProperty({ description: '패', example: '2' })
  @IsString()
  @Expose()
  lose: string;

  @ApiProperty({ description: '세이브', example: '11' })
  @IsString()
  @Expose()
  save: string;

  @ApiProperty({ description: '홀드', example: '11' })
  @IsString()
  @Expose()
  hold: string;

  @ApiProperty({ description: '삼진', example: '11' })
  @IsString()
  @Expose()
  strikeOut: string;

  @ApiProperty({ description: '피안타율', example: '0.356' })
  @IsString()
  @Expose()
  baa: string;

  @ApiProperty({ description: '볼넷 허용', example: '4' })
  @IsString()
  @Expose()
  walksAllowed: string;

  @ApiProperty({ description: '홈런 허용', example: '3' })
  @IsString()
  @Expose()
  homerunAllowed: string;

  @ApiProperty({ description: '승률', example: '0.500' })
  @IsString()
  @Expose()
  winningRate: string;

  @ApiProperty({ description: '이닝 당 주자 허용률', example: '1.33' })
  @IsString()
  @Expose()
  whip: string;

  @ApiProperty({ description: '9이닝 당 삼진', example: '1.02' })
  @IsString()
  @Expose()
  k9: string;

  @ApiProperty({ description: '9이닝 당 볼넷', example: '0.44' })
  @IsString()
  @Expose()
  bb9: string;

  @ApiProperty({ description: '대체 선수 대비 승리 기여도', example: '3.33' })
  @IsString()
  @Expose()
  war: string;
}
