import { SortOrderType } from 'src/shared/types/sort-order.type';
import { PitcherStatType } from '../types/pitcher-stat.type';
import { HitterStatType } from '../types/hitter-stat.type';

interface StatCondition {
  regulation: boolean;
  sortOrder: SortOrderType;
}

interface PitcherStatCondition extends Record<PitcherStatType, StatCondition> {}

export const PITCHER_STAT_CONDITION: PitcherStatCondition = {
  era: { regulation: true, sortOrder: 'ASC' },
  gameCount: { regulation: false, sortOrder: 'DESC' },
  inning: { regulation: false, sortOrder: 'DESC' },
  win: { regulation: false, sortOrder: 'DESC' },
  draw: { regulation: false, sortOrder: 'DESC' },
  lose: { regulation: false, sortOrder: 'DESC' },
  save: { regulation: false, sortOrder: 'DESC' },
  hold: { regulation: false, sortOrder: 'DESC' },
  strikeOut: { regulation: false, sortOrder: 'DESC' },
  baa: { regulation: true, sortOrder: 'DESC' },
  walksAllowed: { regulation: false, sortOrder: 'DESC' },
  homerunAllowed: { regulation: false, sortOrder: 'DESC' },
  winningRate: { regulation: false, sortOrder: 'DESC' },
  whip: { regulation: true, sortOrder: 'ASC' },
  k9: { regulation: true, sortOrder: 'DESC' },
  bb9: { regulation: true, sortOrder: 'DESC' },
  war: { regulation: false, sortOrder: 'DESC' },
};

interface HitterStatCondition extends Record<HitterStatType, StatCondition> {}

export const HITTER_STAT_CONDITION: HitterStatCondition = {
  avg: { regulation: true, sortOrder: 'DESC' },
  gameCount: { regulation: false, sortOrder: 'DESC' },
  pa: { regulation: false, sortOrder: 'DESC' },
  ab: { regulation: false, sortOrder: 'DESC' },
  obp: { regulation: true, sortOrder: 'DESC' },
  slg: { regulation: true, sortOrder: 'DESC' },
  hits: { regulation: false, sortOrder: 'DESC' },
  doubles: { regulation: false, sortOrder: 'DESC' },
  triples: { regulation: false, sortOrder: 'DESC' },
  homerun: { regulation: false, sortOrder: 'DESC' },
  ops: { regulation: true, sortOrder: 'DESC' },
  wrcPlus: { regulation: true, sortOrder: 'DESC' },
  walks: { regulation: false, sortOrder: 'DESC' },
  sb: { regulation: false, sortOrder: 'DESC' },
  rbi: { regulation: false, sortOrder: 'DESC' },
  runs: { regulation: false, sortOrder: 'DESC' },
  war: { regulation: false, sortOrder: 'DESC' },
};
