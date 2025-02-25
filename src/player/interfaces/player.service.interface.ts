import { PlayerStatsRankingReq } from '../dtos/player-stats-ranking.req';

export interface IPlayerService {
  getPlayerStatsRanking(playerStatsTankingDto: PlayerStatsRankingReq);
}
