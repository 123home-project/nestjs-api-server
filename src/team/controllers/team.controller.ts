import { Controller, Get, Inject, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ITeamService } from '../interfaces/team.service.interface';
import { TeamStatsDto } from '../dtos/team-stats.dto';

@Controller('team')
export class TeamController {
  constructor(@Inject('ITeamService') private readonly teamService: ITeamService) {}

  @Get('/stat')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTeamStats(@Query() teamStatsDto: TeamStatsDto) {
    return await this.teamService.getTeamStats(teamStatsDto);
  }
}
