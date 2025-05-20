import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsNumberString, IsOptional, ValidateNested } from 'class-validator';
import { TeamDto } from 'src/team/dtos/team.dto';
import { TeamSchedulePitcherRes } from 'src/team/dtos/team-schedule-pitcher.res';
import { PlayerRes } from './player.res';
import { PlayerPitcherFirstTeamRes } from './player-pitcher-first-team.res';

export class PlayerPitcherStatRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => PlayerRes)
  @IsOptional()
  @Expose()
  player?: PlayerRes;

  @ValidateNested()
  @Type(() => TeamDto)
  @IsOptional()
  @Expose()
  team?: TeamDto;

  @ValidateNested()
  @Type(() => PlayerPitcherFirstTeamRes)
  @IsOptional()
  @Expose()
  playerPitcherFirstTeam?: PlayerPitcherFirstTeamRes;

  @ValidateNested()
  @Type(() => TeamSchedulePitcherRes)
  @IsOptional()
  @Expose()
  teamSchedulePitcher?: TeamSchedulePitcherRes[];

  @IsNumber()
  @Expose()
  year: number;

  @IsNumberString()
  @IsOptional()
  @Expose()
  era?: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  gameCount?: number;

  @IsNumberString()
  @IsOptional()
  @Expose()
  inning?: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  win?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  lose?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  save?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  hold?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  strikeOut?: number;

  @IsNumberString()
  @IsOptional()
  @Expose()
  baa?: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  walksAllowed?: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  homerunsAllowed?: number;

  @IsNumberString()
  @IsOptional()
  @Expose()
  winningRate?: string;

  @IsNumberString()
  @IsOptional()
  @Expose()
  whip?: string;

  @IsNumberString()
  @IsOptional()
  @Expose()
  k9?: string;

  @IsNumberString()
  @IsOptional()
  @Expose()
  bb9?: string;

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
