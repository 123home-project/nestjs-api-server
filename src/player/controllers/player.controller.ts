import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IPlayerService } from '../interfaces/player.service.interface';
import { PlayerStatsRankingReq } from '../dtos/player-stats-ranking.req';
import { PlayerStatsRankingRes } from '../dtos/player-stats-ranking.res';
import { PlayerPitcherStatsReq } from '../dtos/player-pitcher-stats.req';
import { PlayerHitterStatsReq } from '../dtos/player-hitter-stats.req';
import { PlayerPitcherStatsRes } from '../dtos/player-pitcher-stats.res';
import { PlayerHitterStatsRes } from '../dtos/player-hitter-stats.res';

@Controller('player')
export class PlayerController {
  constructor(@Inject('IPlayerService') private readonly playerService: IPlayerService) {}

  @Get('/stat/pitcher')
  async getPlayerPitcherStats(@Query() playerPitcherStatsReq: PlayerPitcherStatsReq): Promise<PlayerPitcherStatsRes[]> {
    return await this.playerService.getPlayerPitcherStats(playerPitcherStatsReq);
  }

  @Get('/stat/hitter')
  async getPlayerHitterStats(@Query() playerHitterStatsReq: PlayerHitterStatsReq): Promise<PlayerHitterStatsRes[]> {
    return await this.playerService.getPlayerHitterStats(playerHitterStatsReq);
  }

  @Get('/stat/ranking')
  async getPlayerStatsRanking(@Query() playerStatsRankingReq: PlayerStatsRankingReq): Promise<PlayerStatsRankingRes> {
    return await this.playerService.getPlayerStatsRanking(playerStatsRankingReq);
  }
}
