import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';
import { PredictionMatch } from '../entities/prediction_match.entity';

export interface IPredictionMatchRepository {
  getMatchPredictionRanking(
    year: number,
    limit: number,
    offset: number,
    keyword: string,
  ): Promise<MatchPredictionRankingRes[]>;
  addPredictionMatch(predictionMatch: PredictionMatch): Promise<PredictionMatch>;
  getPredictionMatchByUserIdAndTeamScheduleId(userId: number, teamScheduleId: number): Promise<PredictionMatch>;
}
