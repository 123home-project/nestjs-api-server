import { SortOrderType } from 'src/shared/types/sort-order.type';
import { TeamStatsType } from '../types/team-stats.type';
import { TeamStat } from '../entities/team-stat.entity';

export interface ITeamStatRepository {
  getTeamStats(
    year: number,
    sortBy: TeamStatsType,
    sortOrder: SortOrderType,
    limit: number,
    offset: number,
  ): Promise<TeamStat[]>;
}
