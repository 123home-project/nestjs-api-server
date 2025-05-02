import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeBaseball } from './entities/youtube-baseball.entity';
import { YoutubeController } from './controllers/youtube.controller';
import { YoutubeBassballRepository } from './repositories/youtube-baseball.repository';
import { YoutubeService } from './services/youtube.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([YoutubeBaseball]), UserModule],
  controllers: [YoutubeController],
  providers: [
    { provide: 'IYoutubeBaseballRepository', useClass: YoutubeBassballRepository },
    { provide: 'IYoutubeService', useClass: YoutubeService },
  ],
  exports: [],
})
export class YoutubeModule {}
