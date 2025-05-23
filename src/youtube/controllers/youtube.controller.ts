import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { IYoutubeService } from '../interfaces/youtube.service.interface';
import { AccessTokenAuthGuard } from 'src/auth/guards/jwt-access-token.auth.guard';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { AccessTokenUser } from 'src/auth/decorators/access-token.decorator';
import { ProvideYoutubeBaseballReq } from '../dtos/provide-youtube-baseball.req';
import { YoutubeBaseballReq } from '../dtos/youtube-baseball.req';

@Controller('youtube')
export class YoutubeController {
  constructor(@Inject('IYoutubeService') private readonly youtubeService: IYoutubeService) {}

  @Post('/baseball')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '유튜브 야구관 영상 제보' })
  async provideYoutubeBaseball(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() provideYoutubeBaseballReq: ProvideYoutubeBaseballReq,
  ) {
    return await this.youtubeService.provideYoutubeBaseball(accessTokenUser, provideYoutubeBaseballReq);
  }

  @Get('/baseball')
  @ApiOkResponse({ description: '유튜브 야구관 영상 리스트' })
  async getYoutubeBasball(@Query() youtubeBaseballReq: YoutubeBaseballReq) {
    return await this.youtubeService.getYoutubeBasball(youtubeBaseballReq);
  }
}
