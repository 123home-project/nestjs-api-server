import { TeamSchedule } from '../entities/team-schedule.entity';

export interface ITeamScheduleRepository {
  getTeamMatchSchedule(year: number): Promise<TeamSchedule[]>;
  getTeamScheduleByIdWithinDate(teamScheduleId: number): Promise<TeamSchedule>;
  getTeamScheduleByDateWithinDate(predictionDate: string): Promise<TeamSchedule>;
}
