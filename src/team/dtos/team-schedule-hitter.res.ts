import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { TeamRes } from './team.res';
import { TeamScheduleRes } from './team-schedule.res';
import { PlayerHitterStatRes } from 'src/player/dtos/player-hitter-stat.res';
import { PredictionPlayerRes } from 'src/prediction/dtos/prediction-player.res';

export class TeamScheduleHitterRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => TeamRes)
  @IsOptional()
  @Expose()
  teamSchedule?: TeamScheduleRes;

  @ValidateNested()
  @Type(() => PlayerHitterStatRes)
  @IsOptional()
  @Expose()
  playerHitterStat?: PlayerHitterStatRes;

  @IsNumber()
  @Expose()
  ab: number;

  @IsNumber()
  @Expose()
  hits: number;

  @IsNumber()
  @Expose()
  doubles: number;

  @IsNumber()
  @Expose()
  triples: number;

  @IsNumber()
  @Expose()
  homerun: number;

  @IsNumber()
  @Expose()
  runs: number;

  @IsNumber()
  @Expose()
  rbi: number;

  @IsNumber()
  @Expose()
  strikeOut: number;

  @IsNumber()
  @Expose()
  sb: number;

  @ValidateNested()
  @Type(() => PredictionPlayerRes)
  @IsOptional()
  @Expose()
  predictionPlayer?: PredictionPlayerRes[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
