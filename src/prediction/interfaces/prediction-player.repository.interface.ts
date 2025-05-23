import { HitterStatType } from 'src/player/types/hitter-stat.type';
import { SortOrderType } from 'src/shared/types/sort-order.type';
import { HitterPredictionRankingRes } from '../dtos/hitter-prediction-ranking.res';
import { PitcherStatType } from 'src/player/types/pitcher-stat.type';
import { PitcherPredictionRankingRes } from '../dtos/pitcher-prediction-ranking.res';
import { PredictionPlayer } from '../entities/prediction_player.entity';
import { HitterStatHistoryRes } from '../dtos/hitter-stat-history.res';
import { PitcherStatHistoryRes } from '../dtos/pitcher-stat-history.res';

export interface IPredictionPlayerRepository {
  addPredictionPlayer(predictionPlayer: PredictionPlayer): Promise<PredictionPlayer>;
  getPredictionPlayerByPredictionDate(predictionDate: string, userId: number): Promise<PredictionPlayer>;
  updatePredictionPlayer(
    userId: number,
    playerHitterStatId: number,
    playerPitcherStatId: number,
    predictionDate: string,
  );
  getPlayerPredictionPitcher(
    year: number,
    limit: number,
    offset: number,
    sortBy: PitcherStatType,
    sortOrder: SortOrderType,
    nickname: string,
    regulation: number,
  ): Promise<PitcherPredictionRankingRes[]>;
  getPlayerPredictionHitter(
    year: number,
    limit: number,
    offset: number,
    sortBy: HitterStatType,
    sortOrder: SortOrderType,
    nickname: string,
    regulation: number,
  ): Promise<HitterPredictionRankingRes[]>;
  getPlayerPredictionPitcherByUserId(userId: number, year: number): Promise<PitcherPredictionRankingRes>;
  getPlayerPredictionHitterByUserId(userId: number, year: number): Promise<HitterPredictionRankingRes>;
  getPlayerPredictionHitterHistoryByUserId(userId: number, year: number): Promise<HitterStatHistoryRes[]>;
  getPlayerPredictionPitcherHistoryByUserId(userId: number, year: number): Promise<PitcherStatHistoryRes[]>;
}
