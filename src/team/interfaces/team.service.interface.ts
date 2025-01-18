import { TeamStatsDto } from '../dtos/team-stats.dto';

export interface ITeamService {
  getTeamStats(teamStatsDto: TeamStatsDto);
}
