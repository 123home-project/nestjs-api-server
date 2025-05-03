import { Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Notice } from '../entities/notice.entity';
import { INoticeRepository } from '../interfaces/notice.repository.interface';
import { NoticeType } from '../types/notice.type';

@Injectable()
export class NoticeRepository extends Repository<Notice> implements INoticeRepository {
  constructor(private dataSource: DataSource) {
    super(Notice, dataSource.createEntityManager());
  }

  async getNotices(keyword: string, limit: number, offset: number, noticeType: NoticeType): Promise<Notice[]> {
    return await this.find({
      where: { title: Like('%' + (keyword ?? '') + '%'), noticeType },
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
