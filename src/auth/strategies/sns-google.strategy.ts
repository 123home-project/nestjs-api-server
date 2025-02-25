import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { LoginPlatformType } from '../types/login-platform.type';
import { snsAccountUserDto } from '../dtos/sns-account-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('google.auth.clientId'),
      clientSecret: configService.get('google.auth.clientSecret'),
      callbackURL: configService.get('google.auth.redirectUrl'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<snsAccountUserDto> {
    try {
      const snsAccountUser = {
        platform: LoginPlatformType.Google,
        name: profile._json.name,
        accountId: profile._json.sub,
        email: profile._json.email,
        verify: true,
      };

      return snsAccountUser;
    } catch (error) {
      throw error;
    }
  }
}
