export const SortOrderType = {
  asc: 'ASC',
  desc: 'DESC',
} as const;

export type SortOrderType = (typeof SortOrderType)[keyof typeof SortOrderType];
