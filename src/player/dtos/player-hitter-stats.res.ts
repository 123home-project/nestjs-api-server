import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerHitterStatsRes {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsDate()
  @Expose()
  birth: Date;

  @IsString()
  @IsOptional()
  @Expose()
  profile?: string;

  @IsNumber()
  @Expose()
  hitterStatId: number;

  @IsNumber()
  @Expose()
  year: number;

  @IsString()
  @Expose()
  avg: string;

  @IsString()
  @Expose()
  gameCount: string;

  @IsString()
  @Expose()
  pa: string;

  @IsString()
  @Expose()
  ab: string;

  @IsString()
  @Expose()
  obp: string;

  @IsString()
  @Expose()
  slg: string;

  @IsString()
  @Expose()
  ops: string;

  @IsString()
  @Expose()
  wrcPlus: string;

  @IsString()
  @Expose()
  hits: string;

  @IsString()
  @Expose()
  doubles: string;

  @IsString()
  @Expose()
  triples: string;

  @IsString()
  @Expose()
  homerun: string;

  @IsString()
  @Expose()
  walks: string;

  @IsString()
  @Expose()
  sb: string;

  @IsString()
  @Expose()
  rbi: string;

  @IsString()
  @Expose()
  runs: string;

  @IsString()
  @Expose()
  war: string;
}
