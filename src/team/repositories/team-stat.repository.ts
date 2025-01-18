import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ITeamStatRepository } from '../interfaces/team-stat.repository.interface';
import { SortOrderType } from 'src/shared/types/SortOrderType';
import { TeamStat } from '../entities/team-stat.entity';
import { TeamStatsSortType } from '../types/TeamStatsSortType';

@Injectable()
export class TeamStatRepository extends Repository<TeamStat> implements ITeamStatRepository {
  constructor(private dataSource: DataSource) {
    super(TeamStat, dataSource.createEntityManager());
  }

  async getTeamStats(
    year: number,
    sortBy: TeamStatsSortType,
    sortOrder: SortOrderType,
    limit: number,
    offset: number,
  ): Promise<TeamStat[]> {
    return this.find({
      relations: ['team', 'team.teamHistory'],
      where: {
        year: year,
      },
      order: { [sortBy]: sortOrder },
      take: limit,
      skip: offset,
    });
  }
}
