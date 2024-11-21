import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import googleConfig from 'src/config/google.config';
import { LoginPlatformType } from '../../interface/type/LoginPlatformType';
import { snsAccountUserDto } from '../../interface/dto/sns-account-user.dto';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject(googleConfig.KEY) private google: ConfigType<typeof googleConfig>) {
    super({
      clientID: google.auth.clientId,
      clientSecret: google.auth.clientSecret,
      callbackURL: google.auth.redirectUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    try {
      const snsAccountUser: snsAccountUserDto = {
        platform: LoginPlatformType.Google,
        name: profile._json.name,
        accountId: profile._json.sub,
        email: profile._json.email,
      };
      return snsAccountUser;
    } catch (error) {
      return error;
    }
  }
}
