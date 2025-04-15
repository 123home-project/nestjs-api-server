import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PlayerPitcherStat } from '../entities/player-pitcher-stat.entity';
import { IPlayerPitcherStatRepository } from '../interfaces/player-pitcher-stat.repository.interface';

@Injectable()
export class PlayerPitcherStatRepository extends Repository<PlayerPitcherStat> implements IPlayerPitcherStatRepository {
  constructor(private dataSource: DataSource) {
    super(PlayerPitcherStat, dataSource.createEntityManager());
  }

  async getPlayerPitcherStatById(playerPitcherStatId: number): Promise<PlayerPitcherStat> {
    if (!playerPitcherStatId) {
      return null;
    }

    return this.findOne({ where: { id: playerPitcherStatId } });
  }
}
