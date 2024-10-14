import { Module } from '@nestjs/common';
import { UserController } from './adepter/in/controllers/user.controller';
import { SnsSignUpService } from './application/services/sns-sign-up.service';
import { SignUpStrategyMap } from './domain/strategy/map/sns-sign-up.strategy.map';
import { GoogleSignUpStrategy } from './domain/strategy/google-sign-up.strategy';

@Module({
  controllers: [UserController],
  providers: [{ provide: 'ISnsSignUpService', useClass: SnsSignUpService }, SignUpStrategyMap, GoogleSignUpStrategy],
})
export class UserModule {}
