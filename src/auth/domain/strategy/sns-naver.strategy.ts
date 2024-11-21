import { PassportStrategy } from '@nestjs/passport';
import { LoginPlatformType } from '../../interface/type/LoginPlatformType';
import { Profile, Strategy } from 'passport-naver-v2';
import { snsAccountUserDto } from '../../interface/dto/sns-account-user.dto';
import { Inject } from '@nestjs/common';
import naverConfig from 'src/config/naver.config';
import { ConfigType } from '@nestjs/config';

export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(@Inject(naverConfig.KEY) private naver: ConfigType<typeof naverConfig>) {
    super({
      clientID: naver.auth.clientId,
      clientSecret: naver.auth.clientSecret,
      callbackURL: naver.auth.redirectUrl,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    try {
      const naverProfile = JSON.parse(profile._json);
      const snsAccountUser: snsAccountUserDto = {
        platform: LoginPlatformType.Naver,
        name: naverProfile.response.name,
        accountId: naverProfile.response.id,
        email: naverProfile.response.email,
      };
      return snsAccountUser;
    } catch (error) {
      return error;
    }
  }
}
