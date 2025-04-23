export const boardType = {
  free: 'free',
  team: 'team',
} as const;

export type boardType = (typeof boardType)[keyof typeof boardType];
