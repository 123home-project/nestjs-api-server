import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PlayerHitterStat } from '../entities/player-hitter-stat.entity';
import { IPlayerHitterStatRepository } from '../interfaces/player-hitter-stat.repository.interface';

@Injectable()
export class PlayerHitterStatRepository extends Repository<PlayerHitterStat> implements IPlayerHitterStatRepository {
  constructor(private dataSource: DataSource) {
    super(PlayerHitterStat, dataSource.createEntityManager());
  }

  async getPlayerHitterStatById(playerHitterStatId: number): Promise<PlayerHitterStat> {
    if (!playerHitterStatId) {
      return null;
    }

    return this.findOne({ where: { id: playerHitterStatId } });
  }
}
