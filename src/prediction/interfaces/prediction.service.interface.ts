import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { MatchPredictionRankingReq } from '../dtos/match-prediction-ranking.req';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';
import { PredictMatchReq } from '../dtos/predict-match.req';
import { UpdateMatchPredictionReq } from '../dtos/update-match-prediction.req';
import { MyMatchPredictionResultReq } from '../dtos/my-match-prediction-result.req';
import { MyMatchPredictionResultRes } from '../dtos/my-match-prediction-result.res';
import { MyMatchPredictionHistoryReq } from '../dtos/my-match-prediction-history.req';
import { MyMatchPredictionHistoryRes } from '../dtos/my-match-prediction-history.res';
import { PlayerPredictionRankingReq } from '../dtos/player-prediction-ranking.req';
import { PlayerPredictionRankingRes } from '../dtos/player-prediction-ranking.res';
import { PredictPlayerReq } from '../dtos/predict-player.req';
import { UpdatePlayerPredictionReq } from '../dtos/update-player-prediction.req';
import { PlayerPredictionPitcherReq } from '../dtos/player-prediction-pitcher.req';
import { PitcherPredictionRankingRes } from '../dtos/pitcher-prediction-ranking.res';
import { PlayerPredictionHitterReq } from '../dtos/player-prediction-hitter.req';

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
  getMyMatchPredictionHistory(
    accessTokenUser: JwtAccessTokenReq,
    myMatchPredictionHistoryReq: MyMatchPredictionHistoryReq,
  ): Promise<MyMatchPredictionHistoryRes[]>;
  getPlayerPredictionRankings(
    playerPredictionRankingReq: PlayerPredictionRankingReq,
  ): Promise<PlayerPredictionRankingRes>;
  predictPlayer(accessTokenUser: JwtAccessTokenReq, predictPlayerReq: PredictPlayerReq);
  updatePlayerPrediction(accessTokenUser: JwtAccessTokenReq, updatePlayerPredictionReq: UpdatePlayerPredictionReq);
  getPlayerPredictionPitcher(
    playerPredictionPitcher: PlayerPredictionPitcherReq,
  ): Promise<PitcherPredictionRankingRes[]>;
  getPlayerPredictionHitter(playerPredictionHitter: PlayerPredictionHitterReq);
}
