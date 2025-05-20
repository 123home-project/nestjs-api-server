import { PitcherStatType } from 'src/player/types/pitcher-stat.type';
import { HitterStatType } from 'src/player/types/hitter-stat.type';
import { PredictionHitterStatType } from '../types/prediction-hitter-stat.type';
import { PredictionPitcherStatType } from '../types/prediction-pitcher-stat.type';

export const USER_PREDICTION_HITTER_STAT_RANKING_LIST: HitterStatType[] = [
  PredictionHitterStatType.avg,
  PredictionHitterStatType.homerun,
  PredictionHitterStatType.ops,
  PredictionHitterStatType.sb,
  PredictionHitterStatType.rbi,
];

export const USER_PREDICTION_PITCHER_STAT_RANKING_LIST: PitcherStatType[] = [
  PredictionPitcherStatType.win,
  PredictionPitcherStatType.era,
  PredictionPitcherStatType.save,
  PredictionPitcherStatType.hold,
  PredictionPitcherStatType.strikeOut,
];
