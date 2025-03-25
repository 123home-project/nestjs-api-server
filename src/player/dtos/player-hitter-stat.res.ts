import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsNumberString, IsOptional, ValidateNested } from 'class-validator';
import { TeamScheduleHitterRes } from 'src/team/dtos/team-schedule-hitter.res';
import { TeamRes } from 'src/team/dtos/team.res';
import { PlayerRes } from './player.res';
import { PlayerHitterFirstTeamRes } from './player-hitter-first-team.res';

export class PlayerHitterStatRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => PlayerRes)
  @IsOptional()
  @Expose()
  player?: PlayerRes;

  @ValidateNested()
  @Type(() => TeamRes)
  @IsOptional()
  @Expose()
  team?: TeamRes;

  @ValidateNested()
  @Type(() => PlayerHitterFirstTeamRes)
  @IsOptional()
  @Expose()
  playerHitterFirstTeam?: PlayerHitterFirstTeamRes;

  @ValidateNested()
  @Type(() => TeamScheduleHitterRes)
  @IsOptional()
  @Expose()
  teamScheduleHitter?: TeamScheduleHitterRes[];

  @IsNumber()
  @Expose()
  year: number;

  @IsNumberString()
  @IsOptional()
  @Expose()
  avg?: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  gameCount?: number;

  @IsNumberString()
  @IsOptional()
  @Expose()
  pa?: string;

  @IsNumberString()
  @IsOptional()
  @Expose()
  ab?: string;

  @IsNumberString()
  @IsOptional()
  @Expose()
  obp?: string;

  @IsNumberString()
  @IsOptional()
  @Expose()
  slg?: string;

  @IsNumberString()
  @IsOptional()
  @Expose()
  ops?: string;

  @IsNumberString()
  @IsOptional()
  @Expose()
  wrcPlus?: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  htis?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  doubles?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  triples?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  homerun?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  walks?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  sb?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  rbi?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  runs?: number;

  @IsNumberString()
  @IsOptional()
  @Expose()
  war?: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
