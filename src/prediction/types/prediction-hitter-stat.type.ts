export const PredictionHitterStatType = {
  avg: 'avg',
  homerun: 'homerun',
  ops: 'ops',
  sb: 'sb',
  rbi: 'rbi',
} as const;

export type PredictionHitterStatType = (typeof PredictionHitterStatType)[keyof typeof PredictionHitterStatType];
