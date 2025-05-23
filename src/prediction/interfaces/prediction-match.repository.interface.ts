import { GameResultType } from 'src/team/types/game-result.type';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';
import { PredictionMatch } from '../entities/prediction_match.entity';
import { MyMatchPredictionResultRes } from '../dtos/my-match-prediction-result.res';

export interface IPredictionMatchRepository {
  getMatchPredictionRanking(
    year: number,
    limit: number,
    offset: number,
    keyword: string,
  ): Promise<MatchPredictionRankingRes[]>;
  addPredictionMatch(predictionMatch: PredictionMatch): Promise<PredictionMatch>;
  getPredictionMatchByUserIdAndTeamScheduleId(userId: number, teamScheduleId: number): Promise<PredictionMatch>;
  updateMatchPrediction(userId: number, teamScheduleId: number, prediction: GameResultType);
  getmyMatchPredictionResultByUserId(userId: number, year: number): Promise<MyMatchPredictionResultRes>;
  getPredictionMatchByUserId(userId: number, year: number): Promise<PredictionMatch[]>;
}
