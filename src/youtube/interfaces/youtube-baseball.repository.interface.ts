import { YoutubeBaseball } from '../entities/youtube-baseball.entity';

export interface IYoutubeBaseballRepository {
  addYoutubeBaseball(youtubeBaseball: YoutubeBaseball): Promise<YoutubeBaseball>;
}
