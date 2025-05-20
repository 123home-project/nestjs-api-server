export const BoardFiterType = {
  none: 'none',
  like: 'like',
  comment: 'comment',
  view: 'view',
} as const;

export type BoardFiterType = (typeof BoardFiterType)[keyof typeof BoardFiterType];
