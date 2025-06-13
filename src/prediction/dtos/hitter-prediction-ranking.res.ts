import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HitterPredictionRankingRes {
  @ApiProperty({ description: '유저 id', example: 123 })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({ description: '유저 닉네임', example: '안녕' })
  @IsString()
  @Expose()
  nickname: string;

  @ApiProperty({ description: '타율', example: 0.365 })
  @IsNumber()
  @Expose()
  avg: number;

  @ApiProperty({ description: '홈런', example: 14 })
  @IsNumber()
  @Expose()
  homerun: number;

  @ApiProperty({ description: '타점', example: 111 })
  @IsNumber()
  @Expose()
  rbi: number;

  @ApiProperty({ description: '도루', example: 33 })
  @IsNumber()
  @Expose()
  sb: number;

  @ApiProperty({ description: 'ops', example: 1.002 })
  @IsNumber()
  @Expose()
  ops: number;
}
