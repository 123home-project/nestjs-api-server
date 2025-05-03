import { NoticeListReq } from '../dtos/notice-list.req';
import { NoticeListRes } from '../dtos/notice-list.res';

export interface INoticeService {
  getNoticeList(noticeListReq: NoticeListReq): Promise<NoticeListRes[]>;
}
