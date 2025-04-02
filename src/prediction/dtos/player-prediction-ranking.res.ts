import { ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PredictionRankingProfileRes } from './prediction-ranking-profile.res';

export class PitcherPredictionsRankingDto {
  @ApiProperty({ description: '승', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  win: PredictionRankingProfileRes[];

  @ApiProperty({ description: '평균자책점', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  era: PredictionRankingProfileRes[];

  @ApiProperty({ description: '세이브', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  save: PredictionRankingProfileRes[];

  @ApiProperty({ description: '홀드', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  hold: PredictionRankingProfileRes[];

  @ApiProperty({ description: '탈삼진', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  strikeOut: PredictionRankingProfileRes[];
}

export class HitterPredictionsRankingDto {
  @ApiProperty({ description: '타율', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  avg: PredictionRankingProfileRes[];

  @ApiProperty({ description: '홈런', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  homerun: PredictionRankingProfileRes[];

  @ApiProperty({ description: '출루율 + 장타율', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  ops: PredictionRankingProfileRes[];

  @ApiProperty({ description: '도루', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  sb: PredictionRankingProfileRes[];

  @ApiProperty({ description: '타점', type: [PredictionRankingProfileRes] })
  @ValidateNested()
  @Type(() => PredictionRankingProfileRes)
  @Expose()
  rbi: PredictionRankingProfileRes[];
}

export class PlayerPredictionRankingRes {
  @ApiProperty({ description: '투수 기록별 랭킹', type: PitcherPredictionsRankingDto })
  @ValidateNested()
  @Type(() => PitcherPredictionsRankingDto)
  @Expose()
  pitcher: PitcherPredictionsRankingDto;

  @ApiProperty({ description: '타자 기록별 랭킹', type: HitterPredictionsRankingDto })
  @ValidateNested()
  @Type(() => HitterPredictionsRankingDto)
  @Expose()
  hitter: HitterPredictionsRankingDto;
}
