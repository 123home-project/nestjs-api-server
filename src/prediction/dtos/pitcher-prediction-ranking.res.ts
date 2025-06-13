import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PitcherPredictionRankingRes {
  @ApiProperty({ description: '유저 id', example: 123 })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({ description: '유저 닉네임', example: '안녕' })
  @IsString()
  @Expose()
  nickname: string;

  @ApiProperty({ description: '승리', example: 10 })
  @IsNumber()
  @Expose()
  win: number;

  @ApiProperty({ description: '평균자책점', example: 2.56 })
  @IsNumber()
  @Expose()
  era: number;

  @ApiProperty({ description: '세이브', example: 7 })
  @IsNumber()
  @Expose()
  save: number;

  @ApiProperty({ description: '홀드', example: 3 })
  @IsNumber()
  @Expose()
  hold: number;

  @ApiProperty({ description: '삼진', example: 36 })
  @IsNumber()
  @Expose()
  strikeOut: number;
}
