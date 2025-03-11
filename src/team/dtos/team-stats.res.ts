import { Expose } from 'class-transformer';

export class TeamStatsRes {
  @Expose()
  name: string;

  @Expose()
  logo: string;

  @Expose()
  gameCount: number;

  @Expose()
  win: number;

  @Expose()
  draw: number;

  @Expose()
  lose: number;

  @Expose()
  winRate: number;

  @Expose()
  avg: number;

  @Expose()
  era: number;

  @Expose()
  ops: number;

  @Expose()
  strikeOut: number;

  @Expose()
  homerun: number;

  @Expose()
  sb: number;

  @Expose()
  wrcPlus: number;
}
