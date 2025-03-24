import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';

export interface IPredictionMatchRepository {
  getMatchPredictionRanking(year: number, limit: number, offset: number, keyword): Promise<MatchPredictionRankingRes[]>;
}
