import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { NoticeType } from '../types/notice.type';

export class NoticeListRes {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  title: string;

  @IsEnum(NoticeType)
  @Expose()
  noticeType: NoticeType;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
