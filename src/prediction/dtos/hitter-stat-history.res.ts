import { IsDate, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HitterStatHistoryRes {
  @ApiProperty({ description: '예측 일', example: '2025-05-05' })
  @IsDate()
  @Expose()
  predictionDate: Date;

  @ApiProperty({ description: '타자 스탯 id', example: 123 })
  @IsNumber()
  @Expose()
  hitterStatId: number;

  @ApiProperty({ description: '이름', example: '안녕' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '프로필', example: '안녕' })
  @IsString()
  @Expose()
  profile: string;

  @ApiProperty({ description: '타석', example: 45 })
  @IsNumber()
  @Expose()
  ab: number;

  @ApiProperty({ description: '타율', example: 0.365 })
  @IsNumber()
  @Expose()
  hits: number;

  @ApiProperty({ description: '홈런', example: 13 })
  @IsNumber()
  @Expose()
  homerun: number;

  @ApiProperty({ description: '볼넷', example: 43 })
  @IsNumber()
  @Expose()
  walks: number;

  @ApiProperty({ description: '타점', example: 113 })
  @IsNumber()
  @Expose()
  rbi: number;

  @ApiProperty({ description: '도루', example: 30 })
  @IsNumber()
  @Expose()
  sb: number;
}
