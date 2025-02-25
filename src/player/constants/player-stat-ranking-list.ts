import { SortOrderType } from 'src/shared/types/sort-order.type';
import { PitcherStatType } from '../types/pitcher-stat.type';
import { HitterStatType } from '../types/hitter-stat.type';

type HitterStatRankingType = {
  statType: HitterStatType;
  regulation: boolean;
  sortOrder: SortOrderType;
};

export const PLAYER_HITTER_STAT_RANKING_LIST: HitterStatRankingType[] = [
  { statType: 'avg', regulation: true, sortOrder: 'DESC' },
  { statType: 'homerun', regulation: false, sortOrder: 'DESC' },
  { statType: 'ops', regulation: true, sortOrder: 'DESC' },
  { statType: 'wrcPlus', regulation: true, sortOrder: 'DESC' },
  { statType: 'sb', regulation: false, sortOrder: 'DESC' },
  { statType: 'rbi', regulation: false, sortOrder: 'DESC' },
  { statType: 'war', regulation: false, sortOrder: 'DESC' },
];

type PitcherStatRankingType = {
  statType: PitcherStatType;
  regulation: boolean;
  sortOrder: SortOrderType;
};

export const PLAYER_PITCHER_STAT_RANKING_LIST: PitcherStatRankingType[] = [
  { statType: 'win', regulation: false, sortOrder: 'DESC' },
  { statType: 'era', regulation: true, sortOrder: 'ASC' },
  { statType: 'save', regulation: false, sortOrder: 'DESC' },
  { statType: 'hold', regulation: false, sortOrder: 'DESC' },
  { statType: 'strikeOut', regulation: false, sortOrder: 'DESC' },
  { statType: 'whip', regulation: true, sortOrder: 'ASC' },
  { statType: 'war', regulation: false, sortOrder: 'DESC' },
];
