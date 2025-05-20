import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtRefreshTokenReq } from '../dtos/jwt-refresh-token.req';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: configService.get('jwt.secret'),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any): Promise<JwtRefreshTokenReq> {
    return {
      userId: payload.userId,
      platform: payload.platform,
    };
  }
}
