export const BoardType = {
  free: 'free',
  team: 'team',
} as const;

export type BoardType = (typeof BoardType)[keyof typeof BoardType];
