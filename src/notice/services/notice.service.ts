import { Inject, Injectable } from '@nestjs/common';
import { INoticeService } from '../interfaces/notice.serice.interface';
import { NoticeListReq } from '../dtos/notice-list.req';
import { INoticeRepository } from '../interfaces/notice.repository.interface';
import { NoticeListRes } from '../dtos/notice-list.res';
import { plainToInstance } from 'class-transformer';
import { NoticeRes } from '../dtos/notice.res';

@Injectable()
export class NoticeService implements INoticeService {
  constructor(@Inject('INoticeRepository') private readonly noticeRepository: INoticeRepository) {}

  async getNoticeList(noticeListReq: NoticeListReq): Promise<NoticeListRes[]> {
    const { keyword, limit, offset, noticeType } = noticeListReq;

    const notices = await this.noticeRepository.getNotices(keyword, limit, offset, noticeType);

    return plainToInstance(NoticeListRes, notices, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getNoticeById(noticeId: number): Promise<NoticeRes> {
    const notice = await this.noticeRepository.getNoticeById(noticeId);

    return plainToInstance(NoticeRes, notice, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }
}
