import { Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/guards/sns-google.auth.guard';
import { KakaoAuthGuard } from 'src/auth/guards/sns-kakao.auth.guard';
import { NaverAuthGuard } from 'src/auth/guards/sns-naver.auth.guard';
import { IAuthService } from '../interfaces/auth.service.interface';
import { AccountUser } from '../decorators/account-user.decorator';
import { snsAccountUserDto } from '../dtos/sns-account-user.dto';
import { RefreshTokenAuthGuard } from '../guards/jwt-refresh-token.auth.guard';
import { jwtRefreshTokenDto } from '../dtos/jwt-refresh-token.dto';
import { RefreshTokenUser } from '../decorators/refresh-token.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private readonly authService: IAuthService) {}

  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuth() {}

  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthCallback(@AccountUser() accountUser: snsAccountUserDto) {
    return this.authService.snsLogin(accountUser);
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@AccountUser() accountUser: snsAccountUserDto) {
    return this.authService.snsLogin(accountUser);
  }

  @Get('/naver')
  @UseGuards(NaverAuthGuard)
  async naverAuth() {}

  @Get('/naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverAuthCallback(@AccountUser() accountUser: snsAccountUserDto) {
    return this.authService.snsLogin(accountUser);
  }

  @Post('/refresh-token')
  @UseGuards(RefreshTokenAuthGuard)
  async convertRefreshToken(@RefreshTokenUser() refreshTokenUser: jwtRefreshTokenDto) {
    return this.authService.convertRefreshToken(refreshTokenUser);
  }
}
