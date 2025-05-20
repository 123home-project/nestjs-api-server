import { IsDate, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PitcherStatHistoryRes {
  @ApiProperty({ description: '예측 날짜' })
  @IsDate()
  @Expose()
  predictionDate: Date;

  @ApiProperty({ description: '타자 스탯 id' })
  @IsNumber()
  @Expose()
  pitcherStatId: number;

  @ApiProperty({ description: '이름' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '프로필' })
  @IsString()
  @Expose()
  profile: string;

  @ApiProperty({ description: '승리' })
  @IsNumber()
  @Expose()
  win: number;

  @ApiProperty({ description: '이닝' })
  @IsNumber()
  @Expose()
  inning: number;

  @ApiProperty({ description: '득점 허용' })
  @IsNumber()
  @Expose()
  runsAllowed: number;

  @ApiProperty({ description: '자책점' })
  @IsNumber()
  @Expose()
  er: number;

  @ApiProperty({ description: '세이브' })
  @IsNumber()
  @Expose()
  save: number;

  @ApiProperty({ description: '홀드' })
  @IsNumber()
  @Expose()
  hold: number;

  @ApiProperty({ description: '삼진' })
  @IsNumber()
  @Expose()
  strikeOut: number;
}
