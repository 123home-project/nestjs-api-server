import { TeamSchedule } from '../entities/team-schedule.entity';

export interface ITeamScheduleRepository {
  getTeamMatchSchedule(year: number): Promise<TeamSchedule[]>;
}
