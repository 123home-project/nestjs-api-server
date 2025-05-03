import { Notice } from '../entities/notice.entity';
import { NoticeType } from '../types/notice.type';

export interface INoticeRepository {
  getNotices(keyword: string, limit: number, offset: number, noticeType: NoticeType): Promise<Notice[]>;
}
