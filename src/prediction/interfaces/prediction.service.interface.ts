import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { MatchPredictionRankingReq } from '../dtos/match-prediction-ranking.req';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';
import { PredictMatchReq } from '../dtos/predict-match.req';
import { UpdateMatchPredictionReq } from '../dtos/update-match-prediction.req';
import { MyMatchPredictionResultReq } from '../dtos/my-match-prediction-result.req';
import { MyMatchPredictionResultRes } from '../dtos/my-match-prediction-result.res';

export interface IPredictionService {
  getMatchPredictionRankings(
    matchPredictionRankingReq: MatchPredictionRankingReq,
  ): Promise<MatchPredictionRankingRes[]>;
  predictMatch(accessTokenUser: JwtAccessTokenReq, predictMatchReq: PredictMatchReq);
  updateMatchPrediction(accessTokenUser: JwtAccessTokenReq, updateMatchPredictionReq: UpdateMatchPredictionReq);
  getMyMatchPredictionResult(
    accessTokenUser: JwtAccessTokenReq,
    myMatchPredictionResultReq: MyMatchPredictionResultReq,
  ): Promise<MyMatchPredictionResultRes>;
}
