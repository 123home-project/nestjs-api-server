import { HitterStatType } from 'src/player/types/hitter-stat.type';
import { SortOrderType } from 'src/shared/types/sort-order.type';
import { HitterPredictionRankingRes } from '../dtos/hitter-prediction-ranking.res';
import { PitcherStatType } from 'src/player/types/pitcher-stat.type';
import { PitcherPredictionRankingRes } from '../dtos/pitcher-prediction-ranking.res';
import { PredictionPlayer } from '../entities/prediction_player.entity';

export interface IPredictionPlayerRepository {
  getHitterPredictionRanking(
    year: number,
    limit: number,
    offset: number,
    sortBy: HitterStatType,
    sortOrder: SortOrderType,
    regulation: number,
  ): Promise<HitterPredictionRankingRes[]>;
  getPitcherPredictionRanking(
    year: number,
    limit: number,
    offset: number,
    sortBy: PitcherStatType,
    sortOrder: SortOrderType,
    regulation: number,
  ): Promise<PitcherPredictionRankingRes[]>;
  addPredictionPlayer(predictionPlayer: PredictionPlayer): Promise<PredictionPlayer>;
  getPredictionPlayerByPredictionDate(predictionDate: string, userId: number): Promise<PredictionPlayer>;
  updatePredictionPlayer(
    userId: number,
    playerHitterStatId: number,
    playerPitcherStatId: number,
    predictionDate: string,
  );
}
