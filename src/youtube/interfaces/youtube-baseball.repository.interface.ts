import { YoutubeBaseball } from '../entities/youtube-baseball.entity';

export interface IYoutubeBaseballRepository {
  addYoutubeBaseball(youtubeBaseball: YoutubeBaseball): Promise<YoutubeBaseball>;
  getYoutubeBasballs(limit: number, offset: number, keyword: string);
}
