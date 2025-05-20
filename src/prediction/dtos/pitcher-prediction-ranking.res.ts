import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PitcherPredictionRankingRes {
  @ApiProperty({ description: '유저 id' })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({ description: '유저 닉네임' })
  @IsString()
  @Expose()
  nickname: string;

  @ApiProperty({ description: '승리' })
  @IsNumber()
  @Expose()
  win: number;

  @ApiProperty({ description: '평균자책점' })
  @IsNumber()
  @Expose()
  era: number;

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
