import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { ProvideYoutubeBaseballReq } from '../dtos/provide-youtube-baseball.req';
import { YoutubeBaseballReq } from '../dtos/youtube-baseball.req';

export interface IYoutubeService {
  provideYoutubeBaseball(accessTokenUser: JwtAccessTokenReq, provideYoutubeBaseballReq: ProvideYoutubeBaseballReq);
  getYoutubeBasball(youtubeBaseballReq: YoutubeBaseballReq);
}
