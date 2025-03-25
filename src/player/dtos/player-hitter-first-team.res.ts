import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { PlayerHitterStatRes } from './player-hitter-stat.res';

export class PlayerHitterFirstTeamRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => PlayerHitterStatRes)
  @IsOptional()
  @Expose()
  playerHitterStat?: PlayerHitterStatRes;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
