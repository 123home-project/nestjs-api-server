import { Inject, Injectable } from '@nestjs/common';
import { ITeamService } from '../interfaces/team.service.interface';
import { ITeamStatRepository } from '../interfaces/team-stat.repository.interface';
import { plainToInstance } from 'class-transformer';
import { TeamStatsReq } from '../dtos/team-stats.req';
import { TeamStatsRes } from '../dtos/team-stats.res';
import { TeamMatchScheduleReq } from '../dtos/team-match-schedule.req';
import { ITeamScheduleRepository } from '../interfaces/team-schedule.repository.interface';
import { ITimeService } from 'src/time/interfaces/time.service.interface';
import moment from 'moment';
import { TeamMatchDateRes } from '../dtos/team-match-date.res';

@Injectable()
export class TeamService implements ITeamService {
  constructor(
    @Inject('ITeamStatRepository') private readonly teamStatRepository: ITeamStatRepository,
    @Inject('ITeamScheduleRepository') private readonly teamScheduleRepository: ITeamScheduleRepository,
    @Inject('ITimeService') private readonly timeService: ITimeService,
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

  async getTeamMatchSchedule(teamMatchScheduleReq: TeamMatchScheduleReq): Promise<TeamMatchDateRes[]> {
    const { year } = teamMatchScheduleReq;
    const teamSchedule = await this.teamScheduleRepository.getTeamMatchSchedule(year);
    console.log(teamSchedule);
    const result: TeamMatchDateRes[] = [];
    let dateIndex = 0;
    let tsIndex = 0;
    for (let month = 1; month <= 12; month++) {
      const lastDay = this.timeService.getLastDay(year, month);

      for (let day = 1; day <= lastDay; day++) {
        const currentDate = new Date(year, month, day);
        result.push({ date: moment(currentDate).format('YYYY-MM-DD'), match: [] });
        while (
          tsIndex < teamSchedule.length &&
          this.timeService.isSameDate(currentDate, teamSchedule[tsIndex].startDate)
        ) {
          const ts = teamSchedule[tsIndex];
          result[dateIndex].match.push({
            teamScheduleId: ts.id,
            homeTeam: {
              teamId: ts.homeTeam.id,
              name: ts.homeTeam.name,
              logo: ts.homeTeam.logo,
              score: ts.homeTeamScore,
            },
            awayTeam: {
              teamId: ts.awayTeam.id,
              name: ts.awayTeam.name,
              logo: ts.awayTeam.logo,
              score: ts.awayTeamScore,
            },
          });
          tsIndex++;
        }
        dateIndex++;
      }
    }

    return result;
  }
}
