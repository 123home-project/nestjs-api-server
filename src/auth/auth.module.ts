import { Module } from '@nestjs/common';
import { KakaoStrategy } from './strategies/sns-kakao.strategy';
import { AuthController } from './controllers/auth.controller';
import { GoogleStrategy } from './strategies/sns-google.strategy';
import { NaverStrategy } from './strategies/sns-naver.strategy';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/user/user.module';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { EmailModule } from 'src/email/email.module';
import { CryptoModule } from 'src/crypto/crypto.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    SharedModule,
    UserModule,
    EmailModule,
    CryptoModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { algorithm: 'HS256' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'IAuthService', useClass: AuthService },
    { provide: 'IRefreshTokenRepository', useClass: RefreshTokenRepository },
    KakaoStrategy,
    GoogleStrategy,
    NaverStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
