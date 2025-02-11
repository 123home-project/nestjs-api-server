import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { LoginPlatformType } from '../types/login-platform.type';
import { snsAccountUserDto } from '../dtos/sns-account-user.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('kakao.auth.clientId'),
      clientSecret: configService.get('kakao.auth.clientSecret'),
      callbackURL: configService.get('kakao.auth.redirectUrl'),
      scope: ['profile_nickname'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<snsAccountUserDto> {
    try {
      const snsAccountUser: snsAccountUserDto = {
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
