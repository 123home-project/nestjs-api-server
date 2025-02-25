import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlayerRankingProfileDto } from './player-ranking-profile.dto';

export class PitcherStatsRankingDto {
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  win: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  era: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  save: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  hold: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  strikeOut: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  whip: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  war: PlayerRankingProfileDto[];
}

export class HitterStatsRankingDto {
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  avg: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  homerun: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  ops: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  wrcPlus: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  sb: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  rbi: PlayerRankingProfileDto[];

  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  war: PlayerRankingProfileDto[];
}

export class PlayerStatsRankingRes {
  @ValidateNested()
  @Type(() => PitcherStatsRankingDto)
  pitcher: PitcherStatsRankingDto;

  @ValidateNested()
  @Type(() => PitcherStatsRankingDto)
  hitter: HitterStatsRankingDto;
}
