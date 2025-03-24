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
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
