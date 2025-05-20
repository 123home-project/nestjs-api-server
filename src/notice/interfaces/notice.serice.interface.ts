import { NoticeListReq } from '../dtos/notice-list.req';
import { NoticeListRes } from '../dtos/notice-list.res';
import { NoticeRes } from '../dtos/notice.res';

export interface INoticeService {
  getNoticeList(noticeListReq: NoticeListReq): Promise<NoticeListRes[]>;
  getNoticeById(noticeId: number): Promise<NoticeRes>;
}
