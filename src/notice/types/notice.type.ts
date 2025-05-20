export const NoticeType = {
  notice: 'notice',
  event: 'event',
} as const;

export type NoticeType = (typeof NoticeType)[keyof typeof NoticeType];
