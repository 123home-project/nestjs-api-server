import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITimeService } from '../interfaces/time.service.interface';

@Injectable()
export class TimeService implements ITimeService {
  constructor(private readonly configService: ConfigService) {}

  getLastDay(year: number, month: number): number {
    const date = new Date(year, month, 0);
    return date.getDate();
  }

  isSameDate(date1, date2): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
