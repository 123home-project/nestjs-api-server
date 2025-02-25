import { PitcherStatType } from '../types/pitcher-stat.type';
import { HitterStatType } from '../types/hitter-stat.type';

export const PLAYER_HITTER_STAT_RANKING_LIST: HitterStatType[] = [
  HitterStatType.avg,
  HitterStatType.homerun,
  HitterStatType.ops,
  HitterStatType.wrcPlus,
  HitterStatType.sb,
  HitterStatType.rbi,
  HitterStatType.war,
];

export const PLAYER_PITCHER_STAT_RANKING_LIST: PitcherStatType[] = [
  PitcherStatType.win,
  PitcherStatType.era,
  PitcherStatType.save,
  PitcherStatType.hold,
  PitcherStatType.strikeOut,
  PitcherStatType.whip,
  PitcherStatType.war,
];
