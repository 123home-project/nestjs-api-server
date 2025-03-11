import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ITeamService } from '../interfaces/team.service.interface';
import { TeamStatsReq } from '../dtos/team-stats.req';
import { TeamStatsRes } from '../dtos/team-stats.res';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('team')
export class TeamController {
  constructor(@Inject('ITeamService') private readonly teamService: ITeamService) {}

  @Get('/stat')
  @ApiOkResponse({ description: '팀 기록', type: [TeamStatsRes] })
  async getTeamStats(@Query() teamStatsreq: TeamStatsReq): Promise<TeamStatsRes[]> {
    return await this.teamService.getTeamStats(teamStatsreq);
  }
}
