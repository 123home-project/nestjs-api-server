import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { TeamRes } from './team.res';
import { TeamScheduleRes } from './team-schedule.res';
import { PlayerPitcherStatRes } from 'src/player/dtos/player-pitcher-stat.res';
import { PredictionPlayerRes } from 'src/prediction/dtos/prediction-player.res';

export class TeamSchedulePitcherRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => TeamRes)
  @IsOptional()
  @Expose()
  teamSchedule?: TeamScheduleRes;

  @ValidateNested()
  @Type(() => PlayerPitcherStatRes)
  @IsOptional()
  @Expose()
  playerPitcherStat?: PlayerPitcherStatRes;

  @IsNumber()
  @Expose()
  inning: number;

  @IsNumber()
  @Expose()
  hitsAllowed: number;

  @IsNumber()
  @Expose()
  runsAllowed: number;

  @IsNumber()
  @Expose()
  er: number;

  @IsNumber()
  @Expose()
  walksAllowed: number;

  @IsNumber()
  @Expose()
  homerunAllowed: number;

  @IsNumber()
  @Expose()
  strikeOut: number;

  @IsNumber()
  @Expose()
  bf: number;

  @IsNumber()
  @Expose()
  np: number;

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
