import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { NoticeService } from './services/notice.service';
import { NoticeRepository } from './repositories/notice.repository';
import { NoticeController } from './controllers/notice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  controllers: [NoticeController],
  providers: [
    { provide: 'INoticeService', useClass: NoticeService },
    { provide: 'INoticeRepository', useClass: NoticeRepository },
  ],
})
export class NoticeModule {}
