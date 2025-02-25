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
import { PlayerStatsTankingRes } from '../dtos/player-stats-ranking.res';

@Injectable()
export class PlayerService implements IPlayerService {
  constructor(@Inject('IPlayerRepository') private readonly playerRepository: IPlayerRepository) {}

  async getPlayerStatsRanking(playerStatsTankingDto: PlayerStatsRankingReq) {
    const { year, limit } = playerStatsTankingDto;
    const playerStatRanking = { pitcher: {}, hitter: {} };
    for (const pitcherStatType of PLAYER_PITCHER_STAT_RANKING_LIST) {
      const playerPitcherRanking = await this.playerRepository.getPlayerPitcherStat(
        pitcherStatType.statType,
        pitcherStatType.sortOrder,
        limit,
        pitcherStatType.regulation ? 1 : 0,
        year,
      );

      const result = playerPitcherRanking.map((pitcherStat) => {
        console.log(pitcherStat.playerPitcherStat);
        return plainToInstance(PlayerRankingProfileDto, {
          name: pitcherStat.name,
          profile: pitcherStat.profile,
          stat: String(pitcherStat.playerPitcherStat[0][pitcherStatType.statType]),
        });
      });

      playerStatRanking.pitcher[pitcherStatType.statType] = result;
    }

    for (const hitterStatType of PLAYER_HITTER_STAT_RANKING_LIST) {
      const playerHitterRanking = await this.playerRepository.getPlayerHitterStat(
        hitterStatType.statType,
        hitterStatType.sortOrder,
        limit,
        hitterStatType.regulation ? 1 : 0,
        year,
      );
      const result = playerHitterRanking.map((hitterStat) => {
        return plainToInstance(PlayerRankingProfileDto, {
          name: hitterStat.name,
          profile: hitterStat.profile,
          stat: String(hitterStat.playerHitterStat[0][hitterStatType.statType]),
        });
      });

      playerStatRanking.hitter[hitterStatType.statType] = result;
    }

    return plainToInstance(PlayerStatsTankingRes, playerStatRanking);
  }
}
