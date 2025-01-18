import { SortOrderType } from 'src/shared/types/SortOrderType';
import { TeamStatsSortType } from '../types/TeamStatsSortType';
import { TeamStat } from '../entities/team-stat.entity';

export interface ITeamStatRepository {
  getTeamStats(
    year: number,
    sortBy: TeamStatsSortType,
    sortOrder: SortOrderType,
    limit: number,
    offset: number,
  ): Promise<TeamStat[]>;
}
