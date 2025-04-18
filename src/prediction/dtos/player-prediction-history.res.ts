import { ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PitcherStatHistoryRes } from './pitcher-stat-history.res';
import { HitterStatHistoryRes } from './hitter-stat-history.res';

export class PlayerPredictionHistoryRes {
  @ApiProperty({ description: '투수 기록별 랭킹', type: [PitcherStatHistoryRes] })
  @ValidateNested()
  @Type(() => PitcherStatHistoryRes)
  @Expose()
  pitcher: PitcherStatHistoryRes[];

  @ApiProperty({ description: '타자 기록별 랭킹', type: HitterStatHistoryRes })
  @ValidateNested()
  @Type(() => HitterStatHistoryRes)
  @Expose()
  hitter: HitterStatHistoryRes[];
}
