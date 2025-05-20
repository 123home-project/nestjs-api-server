import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAccessTokenReq } from '../dtos/jwt-access-token.req';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any): Promise<JwtAccessTokenReq> {
    return {
      userId: payload.userId,
      nickname: payload.nickname,
      registerDate: payload.createdAt,
      platform: payload.platform,
      verify: payload.verify,
    };
  }
}
