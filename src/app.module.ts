import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { CryptoModule } from './crypto/crypto.module';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';
import { PredictionModule } from './prediction/prediction.module';
import { TimeModule } from './time/time.module';
import { BoardModule } from './board/board.module';
import { YoutubeModule } from './youtube/youtube.module';
import { NoticeModule } from './notice/notice.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    UserModule,
    EmailModule,
    CryptoModule,
    TeamModule,
    PlayerModule,
    PredictionModule,
    TimeModule,
    BoardModule,
    YoutubeModule,
    NoticeModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
