import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PredictionRankingProfileRes {
  @ApiProperty({ description: '유저 id' })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({ description: '유저 닉네임' })
  @IsString()
  @Expose()
  nickname: string;

  @ApiProperty({ description: '스탯 기록' })
  @IsNumber()
  @Expose()
  stat: number;
}
