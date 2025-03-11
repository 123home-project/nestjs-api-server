import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { LoginPlatformType } from '../types/login-platform.type';
import { SnsAccountUserReq } from '../dtos/sns-account-user.req';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('kakao.auth.clientId'),
      clientSecret: configService.get('kakao.auth.clientSecret'),
      callbackURL: configService.get('kakao.auth.redirectUrl'),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<SnsAccountUserReq> {
    try {
      const snsAccountUser: SnsAccountUserReq = {
        platform: LoginPlatformType.Kakao,
        name: profile._json.properties.nickname,
        accountId: profile._json.id,
        verify: true,
      };
      return snsAccountUser;
    } catch (error) {
      throw error;
    }
  }
}
