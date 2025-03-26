import { Body, Controller, Get, Inject, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { IPredictionService } from '../interfaces/prediction.service.interface';
import { MatchPredictionRankingReq } from '../dtos/match-prediction-ranking.req';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';
import { PredictMatchReq } from '../dtos/predict-match.req';
import { AccessTokenAuthGuard } from 'src/auth/guards/jwt-access-token.auth.guard';
import { AccessTokenUser } from 'src/auth/decorators/access-token.decorator';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { UpdateMatchPredictionReq } from '../dtos/update-match-prediction.req';

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

  @Post('/match')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '승패예측 성공' })
  @ApiBadRequestResponse({ description: '존재하지 않는 유저입니다.' })
  async predictMatch(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq, @Body() predictMatchReq: PredictMatchReq) {
    return await this.predictionService.predictMatch(accessTokenUser, predictMatchReq);
  }

  @Patch('/match')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '승패예측 수정 성공' })
  @ApiBadRequestResponse({ description: '존재하지 않는 유저입니다.' })
  async updateMatchPrediction(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() updateMatchPredictionReq: UpdateMatchPredictionReq,
  ) {
    return await this.predictionService.updateMatchPrediction(accessTokenUser, updateMatchPredictionReq);
  }
}
