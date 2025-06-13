import { IsDate, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PitcherStatHistoryRes {
  @ApiProperty({ description: '예측 날짜', example: '2025-05-05' })
  @IsDate()
  @Expose()
  predictionDate: Date;

  @ApiProperty({ description: '타자 스탯 id', example: 123 })
  @IsNumber()
  @Expose()
  pitcherStatId: number;

  @ApiProperty({ description: '이름', example: '안녕' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '프로필', example: 'https://example.com/profile.png' })
  @IsString()
  @Expose()
  profile: string;

  @ApiProperty({ description: '승리', example: 12 })
  @IsNumber()
  @Expose()
  win: number;

  @ApiProperty({ description: '이닝', example: 45.3 })
  @IsNumber()
  @Expose()
  inning: number;

  @ApiProperty({ description: '득점 허용', example: 11 })
  @IsNumber()
  @Expose()
  runsAllowed: number;

  @ApiProperty({ description: '자책점', example: 7 })
  @IsNumber()
  @Expose()
  er: number;

  @ApiProperty({ description: '세이브', example: 11 })
  @IsNumber()
  @Expose()
  save: number;

  @ApiProperty({ description: '홀드', example: 7 })
  @IsNumber()
  @Expose()
  hold: number;

  @ApiProperty({ description: '삼진', example: 62 })
  @IsNumber()
  @Expose()
  strikeOut: number;
}
