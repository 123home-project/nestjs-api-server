import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SortOrderType } from 'src/shared/types/sort-order.type';
import { Player } from '../entities/player.entity';
import { IPlayerRepository } from '../interfaces/player.repository.interface';
import { HitterStatType } from '../types/hitter-stat.type';
import { PitcherStatType } from '../types/pitcher-stat.type';

@Injectable()
export class PlayerRepository extends Repository<Player> implements IPlayerRepository {
  constructor(private dataSource: DataSource) {
    super(Player, dataSource.createEntityManager());
  }
  async getPlayerPitcherStat(
    sortBy: PitcherStatType,
    sortOrder: SortOrderType,
    limit: number,
    regulation: number,
    year: number,
    offset: number,
  ): Promise<Player[]> {
    return this.createQueryBuilder('p')
      .innerJoinAndSelect('p.playerPitcherStat', 'pps')
      .innerJoin('pps.team', 't')
      .innerJoin('t.teamStat', 'ts')
      .where(
        `
          pps.inning >= :regulation * (ts.win + ts.draw + ts.lose) * 1
          AND pps.year = :year
          AND ts.year = :year
        `,
        { regulation, year },
      )
      .orderBy(`pps.${sortBy}`, sortOrder)
      .skip(offset)
      .take(limit)
      .getMany();
  }

  async getPlayerHitterStat(
    sortBy: HitterStatType,
    sortOrder: SortOrderType,
    limit: number,
    regulation: number,
    year: number,
    offset: number,
  ): Promise<Player[]> {
    return this.createQueryBuilder('p')
      .innerJoinAndSelect('p.playerHitterStat', 'phs')
      .innerJoin('phs.team', 't')
      .innerJoin('t.teamStat', 'ts')
      .where(
        `
          phs.pa >= :regulation * (ts.win + ts.draw + ts.lose) * 3.1
          AND phs.year = :year
          AND ts.year = :year
        `,
        { regulation, year },
      )
      .orderBy(`phs.${sortBy}`, sortOrder)
      .skip(offset)
      .take(limit)
      .getMany();
  }

  async getPlayerPitcherFirstTeam(): Promise<Player[]> {
    return this.createQueryBuilder('p')
      .innerJoinAndSelect('p.playerPitcherStat', 'pps')
      .innerJoinAndSelect('pps.team', 't')
      .innerJoin('pps.playerPitcherFirstTeam', 'ppft')
      .orderBy('pps.team_id')
      .getMany();
  }
}
