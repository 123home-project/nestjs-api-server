import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NoticeListReq } from '../dtos/notice-list.req';
import { INoticeService } from '../interfaces/notice.serice.interface';
import { NoticeListRes } from '../dtos/notice-list.res';
import { NoticeRes } from '../dtos/notice.res';

@Controller('notice')
export class NoticeController {
  constructor(@Inject('INoticeService') private readonly noticeService: INoticeService) {}

  @Get('/')
  @ApiOkResponse({ description: '공지사항 리스트', type: [NoticeListRes] })
  async getNoticeList(@Query() noticeListReq: NoticeListReq): Promise<NoticeListRes[]> {
    return await this.noticeService.getNoticeList(noticeListReq);
  }

  @Get('/:noticeId')
  @ApiOkResponse({ description: '공지사항 상세', type: NoticeRes })
  async getNoticeById(@Param('noticeId') noticeId: number): Promise<NoticeRes> {
    return await this.noticeService.getNoticeById(noticeId);
  }
}
