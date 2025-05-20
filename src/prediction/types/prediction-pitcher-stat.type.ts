export const PredictionPitcherStatType = {
  win: 'win',
  era: 'era',
  save: 'save',
  hold: 'hold',
  strikeOut: 'strikeOut',
} as const;

export type PredictionPitcherStatType = (typeof PredictionPitcherStatType)[keyof typeof PredictionPitcherStatType];
