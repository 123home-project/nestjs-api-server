import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/guards/sns-google.auth.guard';
import { KakaoAuthGuard } from 'src/auth/guards/sns-kakao.auth.guard';
import { NaverAuthGuard } from 'src/auth/guards/sns-naver.auth.guard';
import { IAuthService } from '../interfaces/auth.service.interface';
import { AccountUser } from '../decorators/account-user.decorator';
import { snsAccountUserDto } from '../dtos/sns-account-user.dto';
import { RefreshTokenAuthGuard } from '../guards/jwt-refresh-token.auth.guard';
import { JwtRefreshTokenDto } from '../dtos/jwt-refresh-token.dto';
import { RefreshTokenUser } from '../decorators/refresh-token.decorator';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { LocalUserId } from '../decorators/local-user-account.decorator';
import { LocalRegisterDto } from '../dtos/local-register.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private readonly authService: IAuthService) {}

  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuth() {}

  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthCallback(@AccountUser() accountUser: snsAccountUserDto) {
    return await this.authService.snsLogin(accountUser);
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@AccountUser() accountUser: snsAccountUserDto) {
    return await this.authService.snsLogin(accountUser);
  }

  @Get('/naver')
  @UseGuards(NaverAuthGuard)
  async naverAuth() {}

  @Get('/naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverAuthCallback(@AccountUser() accountUser: snsAccountUserDto) {
    return await this.authService.snsLogin(accountUser);
  }

  @Post('/refresh-token')
  @UseGuards(RefreshTokenAuthGuard)
  async convertRefreshToken(@RefreshTokenUser() refreshTokenUser: JwtRefreshTokenDto) {
    return await this.authService.convertRefreshToken(refreshTokenUser);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  localLogin(@LocalUserId() userId: number) {
    return this.authService.localLogin(userId);
  }

  @Post('/register')
  async localRegister(@Body() localRegisterDto: LocalRegisterDto) {
    return await this.authService.localRegister(localRegisterDto);
  }

  @Get('/email')
  async verifyRegisterEmail(@Query('emailauthtoken') emailauthtoken: string) {
    return await this.authService.verifyRegisterEmail(emailauthtoken);
  }
}
