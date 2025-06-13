import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerHitterStatsRes {
  @ApiProperty({ description: '선수 id', example: 123 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '선수 명', example: '안녕' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '선수 생년월일', example: '2025-05-05' })
  @IsDate()
  @Expose()
  birth: Date;

  @ApiPropertyOptional({ description: '선수 프로필 이미지', example: 'https://example.com/profile.png' })
  @IsString()
  @IsOptional()
  @Expose()
  profile?: string;

  @ApiProperty({ description: '선수 타자 기록 id', example: 123 })
  @IsNumber()
  @Expose()
  hitterStatId: number;

  @ApiProperty({ description: '선수 기록 년도', example: '2025' })
  @IsNumber()
  @Expose()
  year: number;

  @ApiProperty({ description: '타율', example: '0.365' })
  @IsString()
  @Expose()
  avg: string;

  @ApiProperty({ description: '경기 수', example: '5' })
  @IsString()
  @Expose()
  gameCount: string;

  @ApiProperty({ description: '타석', example: '133' })
  @IsString()
  @Expose()
  pa: string;

  @ApiProperty({ description: '타수', example: '94' })
  @IsString()
  @Expose()
  ab: string;

  @ApiProperty({ description: '출루율', example: '0.421' })
  @IsString()
  @Expose()
  obp: string;

  @ApiProperty({ description: '장타율', example: '0.580' })
  @IsString()
  @Expose()
  slg: string;

  @ApiProperty({ description: '출루율 + 장타율', example: '1.002' })
  @IsString()
  @Expose()
  ops: string;

  @ApiProperty({ description: '타자 득점생산력', example: '192.4' })
  @IsString()
  @Expose()
  wrcPlus: string;

  @ApiProperty({ description: '안타', example: '84' })
  @IsString()
  @Expose()
  hits: string;

  @ApiProperty({ description: '2루타', example: '21' })
  @IsString()
  @Expose()
  doubles: string;

  @ApiProperty({ description: '3루타', example: '5' })
  @IsString()
  @Expose()
  triples: string;

  @ApiProperty({ description: '홈런', example: '44' })
  @IsString()
  @Expose()
  homerun: string;

  @ApiProperty({ description: '볼넷', example: '16' })
  @IsString()
  @Expose()
  walks: string;

  @ApiProperty({ description: '도루', example: '2' })
  @IsString()
  @Expose()
  sb: string;

  @ApiProperty({ description: '타점', example: '112' })
  @IsString()
  @Expose()
  rbi: string;

  @ApiProperty({ description: '득점', example: '91' })
  @IsString()
  @Expose()
  runs: string;

  @ApiProperty({ description: '대체 선수 대비 승리 기여도', example: '7.77' })
  @IsString()
  @Expose()
  war: string;
}
