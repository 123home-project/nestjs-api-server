import { Inject, Injectable } from '@nestjs/common';
import { ITeamService } from '../interfaces/team.service.interface';
import { ITeamStatRepository } from '../interfaces/team-stat.repository.interface';
import { plainToInstance } from 'class-transformer';
import { TeamStatsReq } from '../dtos/team-stats.req';
import { TeamStatsRes } from '../dtos/team-stats.res';

@Injectable()
export class TeamService implements ITeamService {
  constructor(@Inject('ITeamStatRepository') private readonly teamRepository: ITeamStatRepository) {}

  async getTeamStats(teamStatsReq: TeamStatsReq): Promise<TeamStatsRes[]> {
    const { year, limit, offset, sortBy, sortOrder } = teamStatsReq;
    const teamStats = await this.teamRepository.getTeamStats(year, sortBy, sortOrder, limit, offset);
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
}
