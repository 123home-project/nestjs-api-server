import { PassportStrategy } from '@nestjs/passport';
import { LoginPlatformType } from '../types/login-platform.type';
import { Profile, Strategy } from 'passport-naver-v2';
import { snsAccountUserDto } from '../dtos/sns-account-user.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('naver.auth.clientId'),
      clientSecret: configService.get('naver.auth.clientSecret'),
      callbackURL: configService.get('naver.auth.redirectUrl'),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<snsAccountUserDto> {
    try {
      const snsAccountUser = {
        platform: LoginPlatformType.Naver,
        name: profile.name,
        accountId: profile.id,
        email: profile.email,
        verify: true,
      };

      return snsAccountUser;
    } catch (error) {
      throw error;
    }
  }
}
