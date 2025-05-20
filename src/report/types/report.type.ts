export const ReportType = {
  report: 'report',
  feedback: 'feedback',
} as const;

export type ReportType = (typeof ReportType)[keyof typeof ReportType];
