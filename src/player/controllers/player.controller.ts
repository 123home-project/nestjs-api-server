import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IPlayerService } from '../interfaces/player.service.interface';
import { PlayerStatsRankingReq } from '../dtos/player-stats-ranking.req';
import { PlayerStatsRankingRes } from '../dtos/player-stats-ranking.res';
import { PlayerPitcherStatsReq } from '../dtos/player-pitcher-stats.req';
import { PlayerHitterStatsReq } from '../dtos/player-hitter-stats.req';
import { PlayerPitcherStatsRes } from '../dtos/player-pitcher-stats.res';
import { PlayerHitterStatsRes } from '../dtos/player-hitter-stats.res';
import { ApiOkResponse } from '@nestjs/swagger';
import { PitcherFirstTeamRes } from '../dtos/pitcher-first-team.res';
import { HitterFirstTeamRes } from '../dtos/hitter-first-team.res';

@Controller('player')
export class PlayerController {
  constructor(@Inject('IPlayerService') private readonly playerService: IPlayerService) {}

  @Get('/stat/pitcher')
  @ApiOkResponse({ description: '투수 기록을 가져옴', type: [PlayerPitcherStatsRes] })
  async getPlayerPitcherStats(@Query() playerPitcherStatsReq: PlayerPitcherStatsReq): Promise<PlayerPitcherStatsRes[]> {
    return await this.playerService.getPlayerPitcherStats(playerPitcherStatsReq);
  }

  @Get('/stat/hitter')
  @ApiOkResponse({ description: '타자 기록을 가져옴', type: [PlayerHitterStatsRes] })
  async getPlayerHitterStats(@Query() playerHitterStatsReq: PlayerHitterStatsReq): Promise<PlayerHitterStatsRes[]> {
    return await this.playerService.getPlayerHitterStats(playerHitterStatsReq);
  }

  @Get('/stat/ranking')
  @ApiOkResponse({ description: '각 기록별 선수 순위', type: PlayerStatsRankingRes })
  async getPlayerStatsRanking(@Query() playerStatsRankingReq: PlayerStatsRankingReq): Promise<PlayerStatsRankingRes> {
    return await this.playerService.getPlayerStatsRanking(playerStatsRankingReq);
  }

  @Get('/first-team/pitcher')
  @ApiOkResponse({ description: '1군 투수 리스트', type: [PitcherFirstTeamRes] })
  async getPitcherFirstTeam(): Promise<PitcherFirstTeamRes[]> {
    return await this.playerService.getPitcherFirstTeam();
  }

  @Get('/first-team/hitter')
  @ApiOkResponse({ description: '1군 타자 리스트', type: [HitterFirstTeamRes] })
  async getHitterFirstTeam(): Promise<HitterFirstTeamRes[]> {
    return await this.playerService.getHitterFirstTeam();
  }
}
