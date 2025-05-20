import { IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MyMatchPredictionResultRes {
  @ApiProperty({ description: '유저 id' })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({ description: '예측 시도 횟수' })
  @IsNumber()
  @Expose()
  tryCount: number;

  @ApiProperty({ description: '예측 성공 횟수' })
  @IsNumber()
  @Expose()
  correctCount: number;

  @ApiProperty({ description: '예측 성공 확률' })
  @IsNumber()
  @Expose()
  correctPercent: number;
}
