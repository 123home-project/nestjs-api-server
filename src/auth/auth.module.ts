import { Module } from '@nestjs/common';
import { KakaoStrategy } from './domain/strategy/sns-kakao.strategy';
import { AuthController } from './adapter/in/controller/auth.controller';
import { GoogleStrategy } from './domain/strategy/sns-google.strategy';
import { NaverStrategy } from './domain/strategy/sns-naver.strategy';

@Module({
  controllers: [AuthController],
  providers: [KakaoStrategy, GoogleStrategy, NaverStrategy],
})
export class AuthModule {}
