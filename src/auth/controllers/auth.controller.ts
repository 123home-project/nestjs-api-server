import { Body, Controller, Get, Inject, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/guards/sns-google.auth.guard';
import { KakaoAuthGuard } from 'src/auth/guards/sns-kakao.auth.guard';
import { NaverAuthGuard } from 'src/auth/guards/sns-naver.auth.guard';
import { IAuthService } from '../interfaces/auth.service.interface';
import { AccountUser } from '../decorators/account-user.decorator';
import { SnsAccountUserReq } from '../dtos/sns-account-user.req';
import { RefreshTokenAuthGuard } from '../guards/jwt-refresh-token.auth.guard';
import { JwtRefreshTokenReq } from '../dtos/jwt-refresh-token.req';
import { RefreshTokenUser } from '../decorators/refresh-token.decorator';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { LocalUserId } from '../decorators/local-user-account.decorator';
import { LocalRegisterReq } from '../dtos/local-register.req';
import { AccessTokenAuthGuard } from '../guards/jwt-access-token.auth.guard';
import { AccessTokenUser } from '../decorators/access-token.decorator';
import { JwtAccessTokenReq } from '../dtos/jwt-access-token.req';
import { PasswordForgetReq } from '../dtos/password-forget.req';
import { PasswordResetReq } from '../dtos/password-reset.req';
import { AuthTokenRes } from '../dtos/auth-token.res';

@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private readonly authService: IAuthService) {}

  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuth() {}

  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthCallback(@AccountUser() accountUser: SnsAccountUserReq): Promise<AuthTokenRes> {
    return await this.authService.snsLogin(accountUser);
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@AccountUser() accountUser: SnsAccountUserReq): Promise<AuthTokenRes> {
    return await this.authService.snsLogin(accountUser);
  }

  @Get('/naver')
  @UseGuards(NaverAuthGuard)
  async naverAuth() {}

  @Get('/naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverAuthCallback(@AccountUser() accountUser: SnsAccountUserReq): Promise<AuthTokenRes> {
    return await this.authService.snsLogin(accountUser);
  }

  @Post('/refresh-token')
  @UseGuards(RefreshTokenAuthGuard)
  async convertRefreshToken(@RefreshTokenUser() refreshTokenUser: JwtRefreshTokenReq): Promise<AuthTokenRes> {
    return await this.authService.convertRefreshToken(refreshTokenUser);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  localLogin(@LocalUserId() userId: number): Promise<AuthTokenRes> {
    return this.authService.localLogin(userId);
  }

  @Post('/register')
  async localRegister(@Body() localRegisterReq: LocalRegisterReq): Promise<AuthTokenRes> {
    return await this.authService.localRegister(localRegisterReq);
  }

  @Get('/email')
  async verifyRegisterEmail(@Query('emailauthtoken') emailauthtoken: string) {
    return await this.authService.verifyRegisterEmail(emailauthtoken);
  }

  @Post('/email-resend')
  @UseGuards(AccessTokenAuthGuard)
  async resendEmail(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq) {
    return await this.authService.resendVerifyEmail(accessTokenUser);
  }

  @Post('/password-forget')
  async forgetPassword(@Body() passwordForgetReq: PasswordForgetReq) {
    return await this.authService.sendPasswordResetEmail(passwordForgetReq);
  }

  @Patch('/password-reset')
  async resetPassword(@Body() passwordResetReq: PasswordResetReq) {
    return await this.authService.resetPassword(passwordResetReq);
  }
}
