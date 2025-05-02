import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ITeamService } from '../interfaces/team.service.interface';
import { TeamStatsReq } from '../dtos/team-stats.req';
import { TeamStatsRes } from '../dtos/team-stats.res';
import { ApiOkResponse } from '@nestjs/swagger';
import { TeamMatchScheduleReq } from '../dtos/team-match-schedule.req';
import { TeamMatchDateRes } from '../dtos/team-match-date.res';

@Controller('team')
export class TeamController {
  constructor(@Inject('ITeamService') private readonly teamService: ITeamService) {}

  @Get('/stat')
  @ApiOkResponse({ description: '팀 기록', type: [TeamStatsRes] })
  async getTeamStats(@Query() teamStatsreq: TeamStatsReq): Promise<TeamStatsRes[]> {
    return await this.teamService.getTeamStats(teamStatsreq);
  }

  @Get('/match/schedule')
  @ApiOkResponse({ description: '경기 일정', type: [TeamMatchDateRes] })
  async getTeamMatchSchedule(@Query() teamMatchScheduleReq: TeamMatchScheduleReq): Promise<TeamMatchDateRes[]> {
    return await this.teamService.getTeamMatchSchedule(teamMatchScheduleReq);
  }

  @Get('/')
  @ApiOkResponse({ description: '팀 리스트', type: [TeamMatchDateRes] })
  async getTeam(): Promise<TeamMatchDateRes[]> {
    return await this.teamService.getTeam();
  }
}
