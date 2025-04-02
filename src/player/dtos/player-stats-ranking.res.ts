import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlayerRankingProfileDto } from './player-ranking-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PitcherStatsRankingDto {
  @ApiProperty({ description: '승', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  win: PlayerRankingProfileDto[];

  @ApiProperty({ description: '평균자책점', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  era: PlayerRankingProfileDto[];

  @ApiProperty({ description: '세이브', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  save: PlayerRankingProfileDto[];

  @ApiProperty({ description: '홀드', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  hold: PlayerRankingProfileDto[];

  @ApiProperty({ description: '탈삼진', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  strikeOut: PlayerRankingProfileDto[];

  @ApiProperty({ description: '이닝 당 출루 허용', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  whip: PlayerRankingProfileDto[];

  @ApiProperty({ description: '대체 선수 대비 승리 기여도', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  war: PlayerRankingProfileDto[];
}

export class HitterStatsRankingDto {
  @ApiProperty({ description: '타율', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  avg: PlayerRankingProfileDto[];

  @ApiProperty({ description: '홈런', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  homerun: PlayerRankingProfileDto[];

  @ApiProperty({ description: '출루율 + 장타율', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  ops: PlayerRankingProfileDto[];

  @ApiProperty({ description: '타자 득점 생산력', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  wrcPlus: PlayerRankingProfileDto[];

  @ApiProperty({ description: '도루', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  sb: PlayerRankingProfileDto[];

  @ApiProperty({ description: '타점', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  rbi: PlayerRankingProfileDto[];

  @ApiProperty({ description: '대체 선수 대비 승리 기여도', type: [PlayerRankingProfileDto] })
  @ValidateNested()
  @Type(() => PlayerRankingProfileDto)
  war: PlayerRankingProfileDto[];
}

export class PlayerStatsRankingRes {
  @ApiProperty({ description: '투수 기록', type: PitcherStatsRankingDto })
  @ValidateNested()
  @Type(() => PitcherStatsRankingDto)
  pitcher: PitcherStatsRankingDto;

  @ApiProperty({ description: '타자 기록', type: HitterStatsRankingDto })
  @ValidateNested()
  @Type(() => PitcherStatsRankingDto)
  hitter: HitterStatsRankingDto;
}
