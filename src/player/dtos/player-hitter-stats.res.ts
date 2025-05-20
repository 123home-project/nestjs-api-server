import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerHitterStatsRes {
  @ApiProperty({ description: '선수 id' })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '선수 명' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '선수 생년월일' })
  @IsDate()
  @Expose()
  birth: Date;

  @ApiPropertyOptional({ description: '선수 프로필 이미지' })
  @IsString()
  @IsOptional()
  @Expose()
  profile?: string;

  @ApiProperty({ description: '선수 타자 기록 id' })
  @IsNumber()
  @Expose()
  hitterStatId: number;

  @ApiProperty({ description: '선수 기록 년도' })
  @IsNumber()
  @Expose()
  year: number;

  @ApiProperty({ description: '타율' })
  @IsString()
  @Expose()
  avg: string;

  @ApiProperty({ description: '경기 수' })
  @IsString()
  @Expose()
  gameCount: string;

  @ApiProperty({ description: '타석석' })
  @IsString()
  @Expose()
  pa: string;

  @ApiProperty({ description: '타수' })
  @IsString()
  @Expose()
  ab: string;

  @ApiProperty({ description: '출루율' })
  @IsString()
  @Expose()
  obp: string;

  @ApiProperty({ description: '장타율' })
  @IsString()
  @Expose()
  slg: string;

  @ApiProperty({ description: '출루율 + 장타율' })
  @IsString()
  @Expose()
  ops: string;

  @ApiProperty({ description: '타자 득점생산력' })
  @IsString()
  @Expose()
  wrcPlus: string;

  @ApiProperty({ description: '안타' })
  @IsString()
  @Expose()
  hits: string;

  @ApiProperty({ description: '2루타' })
  @IsString()
  @Expose()
  doubles: string;

  @ApiProperty({ description: '3루타' })
  @IsString()
  @Expose()
  triples: string;

  @ApiProperty({ description: '홈런' })
  @IsString()
  @Expose()
  homerun: string;

  @ApiProperty({ description: '볼넷' })
  @IsString()
  @Expose()
  walks: string;

  @ApiProperty({ description: '도루' })
  @IsString()
  @Expose()
  sb: string;

  @ApiProperty({ description: '타점' })
  @IsString()
  @Expose()
  rbi: string;

  @ApiProperty({ description: '득점' })
  @IsString()
  @Expose()
  runs: string;

  @ApiProperty({ description: '대체 선수 대비 승리 기여도' })
  @IsString()
  @Expose()
  war: string;
}
