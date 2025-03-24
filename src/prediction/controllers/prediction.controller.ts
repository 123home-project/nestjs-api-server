import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { IPredictionService } from '../interfaces/prediction.service.interface';
import { MatchPredictionRankingReq } from '../dtos/match-prediction-ranking.req';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';

@Controller('prediction')
export class PredictionController {
  constructor(@Inject('IPredictionService') private readonly predictionService: IPredictionService) {}

  @Get('/match/ranking')
  @ApiOkResponse({ description: '승패예측 정답 순위', type: [MatchPredictionRankingRes] })
  async getMatchPredictionRankings(
    @Query() matchPredictionRankingReq: MatchPredictionRankingReq,
  ): Promise<MatchPredictionRankingRes[]> {
    return await this.predictionService.getMatchPredictionRankings(matchPredictionRankingReq);
  }
}
