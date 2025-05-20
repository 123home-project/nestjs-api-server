export const HitterStatType = {
  avg: 'avg',
  gameCount: 'gameCount',
  pa: 'pa',
  ab: 'ab',
  obp: 'obp',
  slg: 'slg',
  hits: 'hits',
  doubles: 'doubles',
  triples: 'triples',
  homerun: 'homerun',
  ops: 'ops',
  wrcPlus: 'wrcPlus',
  walks: 'walks',
  sb: 'sb',
  rbi: 'rbi',
  runs: 'runs',
  war: 'war',
} as const;

export type HitterStatType = (typeof HitterStatType)[keyof typeof HitterStatType];
