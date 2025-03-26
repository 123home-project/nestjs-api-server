import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { TeamRes } from './team.res';
import { GameResultType } from '../types/game-result.type';
import { TeamScheduleHitterRes } from './team-schedule-hitter.res';
import { TeamSchedulePitcherRes } from './team-schedule-pitcher.res';
import { PredictionMatchRes } from 'src/prediction/dtos/prediction-match.res';

export class TeamScheduleRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => TeamRes)
  @IsOptional()
  @Expose()
  homeTeam?: TeamRes;

  @ValidateNested()
  @Type(() => TeamRes)
  @IsOptional()
  @Expose()
  awayTeam?: TeamRes;

  @IsDate()
  @Expose()
  startDate: Date;

  @IsNumber()
  @Expose()
  homeTeamScore: number;

  @IsNumber()
  @Expose()
  awayTeamScore: number;

  @IsEnum(GameResultType)
  @Expose()
  result: GameResultType;

  @ValidateNested()
  @Type(() => TeamScheduleHitterRes)
  @IsOptional()
  @Expose()
  teamScheduleHitter?: TeamScheduleHitterRes[];

  @ValidateNested()
  @Type(() => TeamSchedulePitcherRes)
  @IsOptional()
  @Expose()
  teamSchedulePitcher?: TeamSchedulePitcherRes[];

  @ValidateNested()
  @Type(() => PredictionMatchRes)
  @IsOptional()
  @Expose()
  predictionMatch?: PredictionMatchRes[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
