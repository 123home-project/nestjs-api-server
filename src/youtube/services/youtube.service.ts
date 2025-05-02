import { Inject, Injectable } from '@nestjs/common';
import { IYoutubeService } from '../interfaces/youtube.service.interface';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { ProvideYoutubeBaseballReq } from '../dtos/provide-youtube-baseball.req';
import { IYoutubeBaseballRepository } from '../interfaces/youtube-baseball.repository.interface';
import { YoutubeBaseball } from '../entities/youtube-baseball.entity';
import { IUserService } from 'src/user/interfaces/user.service.inteface';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class YoutubeService implements IYoutubeService {
  constructor(
    @Inject('IYoutubeBaseballRepository') private readonly youtubeBaseballRepository: IYoutubeBaseballRepository,
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  async provideYoutubeBaseball(
    accessTokenUser: JwtAccessTokenReq,
    provideYoutubeBaseballReq: ProvideYoutubeBaseballReq,
  ) {
    const { userId } = accessTokenUser;
    const { link } = provideYoutubeBaseballReq;

    const user = await this.userService.getUserById(userId);

    const youtubeBaseball = new YoutubeBaseball();

    youtubeBaseball.user = plainToInstance(User, user);
    youtubeBaseball.link = link;
    youtubeBaseball.permission = false;

    await this.youtubeBaseballRepository.addYoutubeBaseball(youtubeBaseball);
  }
}
