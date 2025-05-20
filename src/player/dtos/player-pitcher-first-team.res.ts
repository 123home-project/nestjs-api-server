import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { PlayerPitcherStatRes } from './player-pitcher-stat.res';

export class PlayerPitcherFirstTeamRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => PlayerPitcherStatRes)
  @IsOptional()
  @Expose()
  playerPitcherStat?: PlayerPitcherStatRes;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
