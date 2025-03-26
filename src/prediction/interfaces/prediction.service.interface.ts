import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { MatchPredictionRankingReq } from '../dtos/match-prediction-ranking.req';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';
import { PredictMatchReq } from '../dtos/predict-match.req';

export interface IPredictionService {
  getMatchPredictionRankings(
    matchPredictionRankingReq: MatchPredictionRankingReq,
  ): Promise<MatchPredictionRankingRes[]>;
  predictMatch(accessTokenUser: JwtAccessTokenReq, predictMatchReq: PredictMatchReq);
}
