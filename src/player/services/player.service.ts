import { Inject, Injectable } from '@nestjs/common';
import { IPlayerService } from '../interfaces/player.service.interface';
import {
  PLAYER_HITTER_STAT_RANKING_LIST,
  PLAYER_PITCHER_STAT_RANKING_LIST,
} from '../constants/player-stat-ranking-list';
import { IPlayerRepository } from '../interfaces/player.repository.interface';
import { plainToInstance } from 'class-transformer';
import { PlayerStatsRankingReq } from '../dtos/player-stats-ranking.req';
import { PlayerRankingProfileDto } from '../dtos/player-ranking-profile.dto';
import { PlayerStatsRankingRes } from '../dtos/player-stats-ranking.res';
import { PlayerPitcherStatsReq } from '../dtos/player-pitcher-stats.req';
import { HITTER_STAT_CONDITION, PITCHER_STAT_CONDITION } from '../constants/player-stat-condition';
import { PlayerHitterStatsReq } from '../dtos/player-hitter-stats.req';
import { PlayerPitcherStatsRes } from '../dtos/player-pitcher-stats.res';
import { PlayerHitterStatsRes } from '../dtos/player-hitter-stats.res';

@Injectable()
export class PlayerService implements IPlayerService {
  constructor(@Inject('IPlayerRepository') private readonly playerRepository: IPlayerRepository) {}

  async getPlayerPitcherStats(playerPitcherStatsReq: PlayerPitcherStatsReq): Promise<PlayerPitcherStatsRes[]> {
    const { year, limit, offset, sortBy, sortOrder } = playerPitcherStatsReq;
    const pitcher = await this.playerRepository.getPlayerPitcherStat(
      sortBy,
      sortOrder ?? PITCHER_STAT_CONDITION[sortBy].sortOrder,
      limit,
      PITCHER_STAT_CONDITION[sortBy].regulation ? 1 : 0,
      year,
      offset,
    );

    const result = pitcher.map((pitcher) => {
      return {
        ...pitcher,
        ...pitcher.playerPitcherStat[0],
        pitcherStatId: pitcher.playerPitcherStat[0].id,
      };
    });

    return plainToInstance(PlayerPitcherStatsRes, result, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getPlayerHitterStats(playerHitterStatsReq: PlayerHitterStatsReq): Promise<PlayerHitterStatsRes[]> {
    const { year, limit, offset, sortBy, sortOrder } = playerHitterStatsReq;
    const hitter = await this.playerRepository.getPlayerHitterStat(
      sortBy,
      sortOrder ?? HITTER_STAT_CONDITION[sortBy].sortOrder,
      limit,
      HITTER_STAT_CONDITION[sortBy].regulation ? 1 : 0,
      year,
      offset,
    );

    const result = hitter.map((hitter) => {
      return {
        ...hitter,
        ...hitter.playerHitterStat[0],
        hitterStatId: hitter.playerHitterStat[0].id,
      };
    });

    return plainToInstance(PlayerHitterStatsRes, result, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getPlayerStatsRanking(playerStatsTankingDto: PlayerStatsRankingReq): Promise<PlayerStatsRankingRes> {
    const { year, limit } = playerStatsTankingDto;
    const playerStatRanking = { pitcher: {}, hitter: {} };
    for (const pitcherStat of PLAYER_PITCHER_STAT_RANKING_LIST) {
      const playerPitcherRanking = await this.playerRepository.getPlayerPitcherStat(
        pitcherStat,
        PITCHER_STAT_CONDITION[pitcherStat].sortOrder,
        limit,
        PITCHER_STAT_CONDITION[pitcherStat].regulation ? 1 : 0,
        year,
        0,
      );

      const result = playerPitcherRanking.map((pitcher) => {
        return plainToInstance(PlayerRankingProfileDto, {
          name: pitcher.name,
          profile: pitcher.profile,
          stat: String(pitcher.playerPitcherStat[0][pitcherStat]),
        });
      });

      playerStatRanking.pitcher[pitcherStat] = result;
    }

    for (const hitterStat of PLAYER_HITTER_STAT_RANKING_LIST) {
      const playerHitterRanking = await this.playerRepository.getPlayerHitterStat(
        hitterStat,
        HITTER_STAT_CONDITION[hitterStat].sortOrder,
        limit,
        HITTER_STAT_CONDITION[hitterStat].regulation ? 1 : 0,
        year,
        0,
      );

      const result = playerHitterRanking.map((hitter) => {
        return plainToInstance(PlayerRankingProfileDto, {
          name: hitter.name,
          profile: hitter.profile,
          stat: String(hitter.playerHitterStat[0][hitterStat]),
        });
      });

      playerStatRanking.hitter[hitterStat] = result;
    }

    return plainToInstance(PlayerStatsRankingRes, playerStatRanking);
  }
}
