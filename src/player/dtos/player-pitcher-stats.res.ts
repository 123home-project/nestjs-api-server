import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerPitcherStatsRes {
  @ApiProperty({ description: '선수 id' })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '선수 이름' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '선수 생년월일' })
  @IsDate()
  @Expose()
  birth: Date;

  @ApiPropertyOptional({ description: '선수 프로필 사진' })
  @IsString()
  @IsOptional()
  @Expose()
  profile?: string;

  @ApiProperty({ description: '투수 기록 id' })
  @IsNumber()
  @Expose()
  pitcherStatId: number;

  @ApiProperty({ description: '선수 기록 년도' })
  @IsNumber()
  @Expose()
  year: number;

  @ApiProperty({ description: '평균 자책점' })
  @IsString()
  @Expose()
  era: string;

  @ApiProperty({ description: '경기 수' })
  @IsString()
  @Expose()
  gameCount: string;

  @ApiProperty({ description: '이닝' })
  @IsString()
  @Expose()
  inning: string;

  @ApiProperty({ description: '승' })
  @IsString()
  @Expose()
  win: string;

  @ApiProperty({ description: '패' })
  @IsString()
  @Expose()
  lose: string;

  @ApiProperty({ description: '세이브' })
  @IsString()
  @Expose()
  save: string;

  @ApiProperty({ description: '홀드' })
  @IsString()
  @Expose()
  hold: string;

  @ApiProperty({ description: '삼진' })
  @IsString()
  @Expose()
  strikeOut: string;

  @ApiProperty({ description: '피안타율' })
  @IsString()
  @Expose()
  baa: string;

  @ApiProperty({ description: '볼넷 허용' })
  @IsString()
  @Expose()
  walksAllowed: string;

  @ApiProperty({ description: '홈런 허용' })
  @IsString()
  @Expose()
  homerunAllowed: string;

  @ApiProperty({ description: '승률' })
  @IsString()
  @Expose()
  winningRate: string;

  @ApiProperty({ description: '이닝 당 주자 허용률' })
  @IsString()
  @Expose()
  whip: string;

  @ApiProperty({ description: '9이닝 당 삼진' })
  @IsString()
  @Expose()
  k9: string;

  @ApiProperty({ description: '9이닝 당 볼넷' })
  @IsString()
  @Expose()
  bb9: string;

  @ApiProperty({ description: '대체 선수 대비 승리 기여도' })
  @IsString()
  @Expose()
  war: string;
}
