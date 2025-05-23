import { HitterFirstTeamRes } from '../dtos/hitter-first-team.res';
import { PitcherFirstTeamRes } from '../dtos/pitcher-first-team.res';
import { PlayerHitterStatRes } from '../dtos/player-hitter-stat.res';
import { PlayerHitterStatsReq } from '../dtos/player-hitter-stats.req';
import { PlayerHitterStatsRes } from '../dtos/player-hitter-stats.res';
import { PlayerPitcherStatsReq } from '../dtos/player-pitcher-stats.req';
import { PlayerPitcherStatsRes } from '../dtos/player-pitcher-stats.res';
import { PlayerStatsRankingReq } from '../dtos/player-stats-ranking.req';
import { PlayerStatsRankingRes } from '../dtos/player-stats-ranking.res';

export interface IPlayerService {
  getPlayerStatsRanking(playerStatsRankingReq: PlayerStatsRankingReq): Promise<PlayerStatsRankingRes>;
  getPlayerPitcherStats(playerPitcherStatsReq: PlayerPitcherStatsReq): Promise<PlayerPitcherStatsRes[]>;
  getPlayerHitterStats(playerHitterStatsReq: PlayerHitterStatsReq): Promise<PlayerHitterStatsRes[]>;
  getPitcherFirstTeam(): Promise<PitcherFirstTeamRes[]>;
  getHitterFirstTeam(): Promise<HitterFirstTeamRes[]>;
  getPlayerHitterStatById(playerHitterStatId: number): Promise<PlayerHitterStatRes>;
  getPlayerPitcherStatById(playerPitcherStatId?: number);
}
