import { Inject, Injectable } from '@nestjs/common';
import { ITeamService } from '../interfaces/team.service.interface';
import { ITeamStatRepository } from '../interfaces/team-stat.repository.interface';
import { plainToInstance } from 'class-transformer';
import { TeamStatsReq } from '../dtos/team-stats.req';
import { TeamStatsRes } from '../dtos/team-stats.res';
import { TeamMatchScheduleReq } from '../dtos/team-match-schedule.req';
import { ITeamScheduleRepository } from '../interfaces/team-schedule.repository.interface';

@Injectable()
export class TeamService implements ITeamService {
  constructor(
    @Inject('ITeamStatRepository') private readonly teamStatRepository: ITeamStatRepository,
    @Inject('ITeamScheduleRepository') private readonly teamScheduleRepository: ITeamScheduleRepository,
  ) {}

  async getTeamStats(teamStatsReq: TeamStatsReq): Promise<TeamStatsRes[]> {
    const { year, limit, offset, sortBy, sortOrder } = teamStatsReq;
    const teamStats = await this.teamStatRepository.getTeamStats(year, sortBy, sortOrder, limit, offset);
    const results = teamStats.map((teamStats) => {
      return {
        ...teamStats,
        name: teamStats.team.name,
        logo: teamStats.team.teamHistory.filter((teamHistory) => teamHistory.year === year)[0].logo,
        gameCount: teamStats.win + teamStats.draw + teamStats.lose,
      };
    });

    return plainToInstance(TeamStatsRes, results, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getTeamMatchSchedule(teamMatchScheduleReq: TeamMatchScheduleReq) {
    const { year } = teamMatchScheduleReq;

    return await this.teamScheduleRepository.getTeamMatchSchedule(year);
  }
}
