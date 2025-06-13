import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MatchPredictionRankingRes {
  @ApiProperty({ description: '유저 id', example: 123 })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({ description: '유저 닉네임', example: '안녕' })
  @IsString()
  @Expose()
  nickname: string;

  @ApiProperty({ description: '예측 시도 횟수', example: 10 })
  @IsNumber()
  @Expose()
  tryCount: number;

  @ApiProperty({ description: '예측 성공 횟수', example: 6 })
  @IsNumber()
  @Expose()
  correctCount: number;

  @ApiProperty({ description: '예측 성공 확률', example: 60 })
  @IsNumber()
  @Expose()
  correctPercent: number;
}
