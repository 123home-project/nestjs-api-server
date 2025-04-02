import { PitcherStatType } from 'src/player/types/pitcher-stat.type';
import { HitterStatType } from 'src/player/types/hitter-stat.type';

export const USER_PREDICTION_HITTER_STAT_RANKING_LIST: HitterStatType[] = [
  HitterStatType.avg,
  HitterStatType.homerun,
  HitterStatType.ops,
  HitterStatType.sb,
  HitterStatType.rbi,
];

export const USER_PREDICTION_PITCHER_STAT_RANKING_LIST: PitcherStatType[] = [
  PitcherStatType.win,
  PitcherStatType.era,
  PitcherStatType.save,
  PitcherStatType.hold,
  PitcherStatType.strikeOut,
];
