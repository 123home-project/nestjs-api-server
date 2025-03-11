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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiMovedPermanentlyResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private readonly authService: IAuthService) {}

  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  @ApiMovedPermanentlyResponse({ description: '카카오 로그인 창' })
  async kakaoAuth() {}

  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  @ApiOkResponse({ description: '카카오 로그인 콜백', type: AuthTokenRes })
  async kakaoAuthCallback(@AccountUser() accountUser: SnsAccountUserReq): Promise<AuthTokenRes> {
    return await this.authService.snsLogin(accountUser);
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  @ApiMovedPermanentlyResponse({ description: '구글 로그인 창' })
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOkResponse({ description: '구글 로그인 콜백', type: AuthTokenRes })
  async googleAuthCallback(@AccountUser() accountUser: SnsAccountUserReq): Promise<AuthTokenRes> {
    return await this.authService.snsLogin(accountUser);
  }

  @Get('/naver')
  @UseGuards(NaverAuthGuard)
  @ApiMovedPermanentlyResponse({ description: '네이버 로그인 창' })
  async naverAuth() {}

  @Get('/naver/callback')
  @UseGuards(NaverAuthGuard)
  @ApiOkResponse({ description: '네이버 로그인 콜백', type: AuthTokenRes })
  async naverAuthCallback(@AccountUser() accountUser: SnsAccountUserReq): Promise<AuthTokenRes> {
    return await this.authService.snsLogin(accountUser);
  }

  @Post('/refresh-token')
  @UseGuards(RefreshTokenAuthGuard)
  @ApiCreatedResponse({ description: '인증 토큰 재발급', type: AuthTokenRes })
  @ApiUnauthorizedResponse({ description: '유효하지 않은 토큰' })
  async convertRefreshToken(@RefreshTokenUser() refreshTokenUser: JwtRefreshTokenReq): Promise<AuthTokenRes> {
    return await this.authService.convertRefreshToken(refreshTokenUser);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ description: '일반 로그인', type: AuthTokenRes })
  localLogin(@LocalUserId() userId: number): Promise<AuthTokenRes> {
    return this.authService.localLogin(userId);
  }

  @Post('/register')
  @ApiCreatedResponse({ description: '회원가입', type: AuthTokenRes })
  @ApiBadRequestResponse({ description: '이미 가입된 계정 이메일입니다.' })
  async localRegister(@Body() localRegisterReq: LocalRegisterReq): Promise<AuthTokenRes> {
    return await this.authService.localRegister(localRegisterReq);
  }

  @Get('/email')
  @ApiOkResponse({ description: '이메일 인증' })
  @ApiUnauthorizedResponse({ description: '인증 시간 초과' })
  async verifyRegisterEmail(@Query('emailauthtoken') emailauthtoken: string) {
    return await this.authService.verifyRegisterEmail(emailauthtoken);
  }

  @Post('/email-resend')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '이메일 재전송' })
  async resendEmail(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq) {
    return await this.authService.resendVerifyEmail(accessTokenUser);
  }

  @Post('/password-forget')
  @ApiCreatedResponse({ description: '비밀번호 초기화 메일 전송' })
  async forgetPassword(@Body() passwordForgetReq: PasswordForgetReq) {
    return await this.authService.sendPasswordResetEmail(passwordForgetReq);
  }

  @Patch('/password-reset')
  @ApiCreatedResponse({ description: '비밀번호 재설정' })
  @ApiUnauthorizedResponse({ description: '인증 시간 초과' })
  async resetPassword(@Body() passwordResetReq: PasswordResetReq) {
    return await this.authService.resetPassword(passwordResetReq);
  }
}
