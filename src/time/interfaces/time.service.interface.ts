export interface ITimeService {
  getLastDay(year: number, month: number): number;
  isSameDate(date1, date2): boolean;
}
