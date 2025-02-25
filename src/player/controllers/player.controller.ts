import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IPlayerService } from '../interfaces/player.service.interface';
import { PlayerStatsRankingReq } from '../dtos/player-stats-ranking.req';
import { PlayerStatsTankingRes } from '../dtos/player-stats-ranking.res';

@Controller('player')
export class PlayerController {
  constructor(@Inject('IPlayerService') private readonly playerService: IPlayerService) {}

  @Get('/stat/ranking')
  async getPlayerStatsRanking(@Query() playerStatsTankingDto: PlayerStatsRankingReq): Promise<PlayerStatsTankingRes> {
    return await this.playerService.getPlayerStatsRanking(playerStatsTankingDto);
  }
}
