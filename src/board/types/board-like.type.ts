export const BoardLikeType = {
  like: 1,
  disLike: -1,
} as const;

export type BoardLikeType = (typeof BoardLikeType)[keyof typeof BoardLikeType];
