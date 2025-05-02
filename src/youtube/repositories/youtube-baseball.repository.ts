import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { YoutubeBaseball } from '../entities/youtube-baseball.entity';
import { IYoutubeBaseballRepository } from '../interfaces/youtube-baseball.repository.interface';

@Injectable()
export class YoutubeBassballRepository extends Repository<YoutubeBaseball> implements IYoutubeBaseballRepository {
  constructor(private dataSource: DataSource) {
    super(YoutubeBaseball, dataSource.createEntityManager());
  }

  async addYoutubeBaseball(youtubeBaseball: YoutubeBaseball): Promise<YoutubeBaseball> {
    return this.save(youtubeBaseball);
  }
}
