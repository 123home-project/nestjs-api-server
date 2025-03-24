import { MatchPredictionRankingReq } from '../dtos/match-prediction-ranking.req';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';

export interface IPredictionService {
  getMatchPredictionRankings(
    matchPredictionRankingReq: MatchPredictionRankingReq,
  ): Promise<MatchPredictionRankingRes[]>;
}
