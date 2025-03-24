import { Inject, Injectable } from '@nestjs/common';
import { IPredictionService } from '../interfaces/prediction.service.interface';
import { MatchPredictionRankingReq } from '../dtos/match-prediction-ranking.req';
import { IPredictionMatchRepository } from '../interfaces/prediction-match.repository.interface';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';

@Injectable()
export class PredictionService implements IPredictionService {
  constructor(
    @Inject('IPredictionMatchRepository') private readonly predictionMatchRepository: IPredictionMatchRepository,
  ) {}

  async getMatchPredictionRankings(
    matchPredictionRankingReq: MatchPredictionRankingReq,
  ): Promise<MatchPredictionRankingRes[]> {
    const { year, limit, offset, keyword } = matchPredictionRankingReq;

    return await this.predictionMatchRepository.getMatchPredictionRanking(year, limit, offset, keyword);
  }
}
