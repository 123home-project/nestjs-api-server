export const SortOrderType = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type SortOrderType = (typeof SortOrderType)[keyof typeof SortOrderType];
