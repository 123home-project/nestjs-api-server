import { TeamMatchDateRes } from '../dtos/team-match-date.res';
import { TeamMatchScheduleReq } from '../dtos/team-match-schedule.req';
import { TeamScheduleRes } from '../dtos/team-schedule.res';
import { TeamStatsReq } from '../dtos/team-stats.req';
import { TeamStatsRes } from '../dtos/team-stats.res';

export interface ITeamService {
  getTeamStats(teamStatsReq: TeamStatsReq): Promise<TeamStatsRes[]>;
  getTeamMatchSchedule(teamMatchScheduleReq: TeamMatchScheduleReq): Promise<TeamMatchDateRes[]>;
  getTeamScheduleWithinDate(teamScheduleId: number): Promise<TeamScheduleRes>;
  getTeamScheduleByDate(predictionDate: string): Promise<TeamScheduleRes>;
  getTeam();
}
