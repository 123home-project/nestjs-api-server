import { Inject, Injectable } from '@nestjs/common';
import { ITeamService } from '../interfaces/team.service.interface';
import { TeamStatsResponse } from '../dtos/team-stats-response.dto';
import { ITeamStatRepository } from '../interfaces/team-stat.repository.interface';
import { plainToInstance } from 'class-transformer';
import { TeamStatsDto } from '../dtos/team-stats.dto';

@Injectable()
export class TeamService implements ITeamService {
  constructor(@Inject('ITeamStatRepository') private readonly teamRepository: ITeamStatRepository) {}

  async getTeamStats(teamStatsDto: TeamStatsDto) {
    const { year, limit, offset, sortBy, sortOrder } = teamStatsDto;
    console.log(teamStatsDto);
    const teamStats = await this.teamRepository.getTeamStats(year, sortBy, sortOrder, limit, offset);
    console.log(teamStats);
    const results = teamStats.map((teamStats) => {
      return {
        ...teamStats,
        name: teamStats.team.name,
        logo: teamStats.team.teamHistory.filter((teamHistory) => teamHistory.year === year)[0].logo,
        gameCount: teamStats.win + teamStats.draw + teamStats.lose,
      };
    });
    return plainToInstance(TeamStatsResponse, results, { excludeExtraneousValues: true });
  }
}
