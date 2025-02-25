export const TeamStatsType = {
  win: 'win',
  draw: 'draw',
  lose: 'lose',
  winRate: 'winRate',
  avg: 'avg',
  era: 'era',
  ops: 'ops',
  strikeOut: 'strikeOut',
  homerun: 'homerun',
  sb: 'sb',
  wrcPlus: 'wrcPlus',
} as const;

export type TeamStatsType = (typeof TeamStatsType)[keyof typeof TeamStatsType];
