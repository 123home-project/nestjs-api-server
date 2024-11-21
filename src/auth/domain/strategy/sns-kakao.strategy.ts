import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { LoginPlatformType } from '../../interface/type/LoginPlatformType';
import { snsAccountUserDto } from '../../interface/dto/sns-account-user.dto';
import kakaoConfig from 'src/config/kakao.config';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(@Inject(kakaoConfig.KEY) private kakao: ConfigType<typeof kakaoConfig>) {
    super({
      clientID: kakao.auth.clientId,
      clientSecret: kakao.auth.clientSecret,
      callbackURL: kakao.auth.redirectUrl,
      scope: ['profile_nickname'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    try {
      const snsAccountUser: snsAccountUserDto = {
        platform: LoginPlatformType.Kakao,
        name: profile._json.properties.nickname,
        accountId: profile._json.id,
      };
      return snsAccountUser;
    } catch (error) {
      return error;
    }
  }
}
