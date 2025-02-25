export const PitcherStatType = {
  era: 'era',
  gameCount: 'gameCount',
  inning: 'inning',
  win: 'win',
  draw: 'draw',
  lose: 'lose',
  save: 'save',
  hold: 'hold',
  strikeOut: 'strikeOut',
  baa: 'baa',
  walksAllowed: 'walksAllowed',
  homerunAllowed: 'homerunAllowed',
  winningRate: 'winningRate',
  whip: 'whip',
  k9: 'k9',
  bb9: 'bb9',
  war: 'war',
} as const;

export type PitcherStatType = (typeof PitcherStatType)[keyof typeof PitcherStatType];
