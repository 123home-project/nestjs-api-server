import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PlayerPitcherStatRes } from './player-pitcher-stat.res';
import { PlayerHitterStatRes } from './player-hitter-stat.res';

export class PlayerRes {
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
  @Expose()
  profile: string;

  @ValidateNested()
  @Type(() => PlayerPitcherStatRes)
  @IsOptional()
  @Expose()
  playerPitcherStat?: PlayerPitcherStatRes[];

  @ValidateNested()
  @Type(() => PlayerHitterStatRes)
  @IsOptional()
  @Expose()
  playerHitterStat?: PlayerHitterStatRes[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
