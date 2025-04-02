import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HitterPredictionRankingRes {
  @ApiProperty({ description: '유저 id' })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({ description: '유저 닉네임' })
  @IsString()
  @Expose()
  nickname: string;

  @ApiProperty({ description: '타율' })
  @IsNumber()
  @Expose()
  avg: number;

  @ApiProperty({ description: '홈런' })
  @IsNumber()
  @Expose()
  homerun: number;

  @ApiProperty({ description: '타점' })
  @IsNumber()
  @Expose()
  rbi: number;

  @ApiProperty({ description: '도루' })
  @IsNumber()
  @Expose()
  sb: number;

  @ApiProperty({ description: 'ops' })
  @IsNumber()
  @Expose()
  ops: number;
}
