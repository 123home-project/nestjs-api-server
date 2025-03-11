import { TeamStatsReq } from '../dtos/team-stats.req';
import { TeamStatsRes } from '../dtos/team-stats.res';

export interface ITeamService {
  getTeamStats(teamStatsReq: TeamStatsReq): Promise<TeamStatsRes[]>;
}
