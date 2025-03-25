import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TeamScheduleRes } from './team-schedule.res';
import { TeamHistoryRes } from './team-history.res';
import { TeamStatRes } from './team-stat.res';
import { PlayerHitterStatRes } from 'src/player/dtos/player-hitter-stat.res';
import { PlayerPitcherStatRes } from 'src/player/dtos/player-pitcher-stat.res';

export class TeamRes {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  logo: string;

  @IsNumber()
  @Expose()
  establishmentYear: number;

  @ValidateNested()
  @Type(() => TeamHistoryRes)
  @IsOptional()
  @Expose()
  teamHistory?: TeamHistoryRes[];

  @ValidateNested()
  @Type(() => TeamStatRes)
  @IsOptional()
  @Expose()
  teamStat?: TeamStatRes[];

  @ValidateNested()
  @Type(() => TeamScheduleRes)
  @IsOptional()
  @Expose()
  homeTeamSchedule?: TeamScheduleRes[];

  @ValidateNested()
  @Type(() => TeamScheduleRes)
  @IsOptional()
  @Expose()
  awayTeamSchedule?: TeamScheduleRes[];

  @ValidateNested()
  @Type(() => PlayerHitterStatRes)
  @IsOptional()
  @Expose()
  playerHitterStat?: PlayerHitterStatRes[];

  @ValidateNested()
  @Type(() => PlayerPitcherStatRes)
  @IsOptional()
  @Expose()
  playerPitcherStat?: PlayerPitcherStatRes[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
