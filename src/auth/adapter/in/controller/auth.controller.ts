import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from 'src/auth/guard/sns-google.auth.guard';
import { KakaoAuthGuard } from 'src/auth/guard/sns-kakao.auth.guard';
import { NaverAuthGuard } from 'src/auth/guard/sns-naver.auth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuth() {}

  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthCallback(@Req() req: Request) {
    console.log(req.user);
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req: Request) {
    console.log(req.user);
  }

  @Get('/naver')
  @UseGuards(NaverAuthGuard)
  async naverAuth() {}

  @Get('/naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverAuthCallback(@Req() req: Request) {
    console.log(req.user);
  }
}
