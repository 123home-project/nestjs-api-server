import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerPitcherStatsRes {
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
  pitcherStatId: number;

  @IsNumber()
  @Expose()
  year: number;

  @IsString()
  @Expose()
  era: string;

  @IsString()
  @Expose()
  gameCount: string;

  @IsString()
  @Expose()
  inning: string;

  @IsString()
  @Expose()
  win: string;

  @IsString()
  @Expose()
  lose: string;

  @IsString()
  @Expose()
  save: string;

  @IsString()
  @Expose()
  hold: string;

  @IsString()
  @Expose()
  strikeOut: string;

  @IsString()
  @Expose()
  baa: string;

  @IsString()
  @Expose()
  walksAllowed: string;

  @IsString()
  @Expose()
  homerunAllowed: string;

  @IsString()
  @Expose()
  winningRate: string;

  @IsString()
  @Expose()
  whip: string;

  @IsString()
  @Expose()
  k9: string;

  @IsString()
  @Expose()
  bb9: string;

  @IsString()
  @Expose()
  war: string;
}
