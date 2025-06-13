import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { ProvideYoutubeBaseballReq } from '../dtos/provide-youtube-baseball.req';
import { YoutubeBaseballReq } from '../dtos/youtube-baseball.req';
import { YoutubeBaseballRes } from '../dtos/youtube-baseball.res';

export interface IYoutubeService {
  provideYoutubeBaseball(accessTokenUser: JwtAccessTokenReq, provideYoutubeBaseballReq: ProvideYoutubeBaseballReq);
  getYoutubeBasball(youtubeBaseballReq: YoutubeBaseballReq): Promise<YoutubeBaseballRes>;
}
