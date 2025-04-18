import { IsDate, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HitterStatHistoryRes {
  @ApiProperty({ description: '예측 일' })
  @IsDate()
  @Expose()
  predictionDate: Date;

  @ApiProperty({ description: '타자 스탯 id' })
  @IsNumber()
  @Expose()
  hitterStatId: number;

  @ApiProperty({ description: '이름' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '프로필' })
  @IsString()
  @Expose()
  profile: string;

  @ApiProperty({ description: '타석' })
  @IsNumber()
  @Expose()
  ab: number;

  @ApiProperty({ description: '타율' })
  @IsNumber()
  @Expose()
  hits: number;

  @ApiProperty({ description: '홈런' })
  @IsNumber()
  @Expose()
  homerun: number;

  @ApiProperty({ description: '볼넷' })
  @IsNumber()
  @Expose()
  walks: number;

  @ApiProperty({ description: '타점' })
  @IsNumber()
  @Expose()
  rbi: number;

  @ApiProperty({ description: '도루' })
  @IsNumber()
  @Expose()
  sb: number;
}
