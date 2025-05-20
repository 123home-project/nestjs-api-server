export const GameResultType = {
  win: 'win',
  draw: 'draw',
  lose: 'lose',
} as const;

export type GameResultType = (typeof GameResultType)[keyof typeof GameResultType];
