import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PredictionRankingProfileRes {
  @ApiProperty({ description: '유저 id', example: 123 })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({ description: '유저 닉네임', example: '안녕' })
  @IsString()
  @Expose()
  nickname: string;

  @ApiProperty({ description: '스탯 기록', example: '0.365' })
  @IsNumber()
  @Expose()
  stat: number;
}
