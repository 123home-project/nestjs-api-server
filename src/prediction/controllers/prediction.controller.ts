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
import { MyMatchPredictionResultReq } from '../dtos/my-match-prediction-result.req';
import { MyMatchPredictionHistoryReq } from '../dtos/my-match-prediction-history.req';
import { MyMatchPredictionHistoryRes } from '../dtos/my-match-prediction-history.res';
import { MyMatchPredictionResultRes } from '../dtos/my-match-prediction-result.res';
import { PlayerPredictionRankingReq } from '../dtos/player-prediction-ranking.req';
import { PlayerPredictionRankingRes } from '../dtos/player-prediction-ranking.res';
import { PredictPlayerReq } from '../dtos/predict-player.req';
import { UpdatePlayerPredictionReq } from '../dtos/update-player-prediction.req';
import { PlayerPredictionPitcherReq } from '../dtos/player-prediction-pitcher.req';
import { PitcherPredictionRankingRes } from '../dtos/pitcher-prediction-ranking.res';
import { PlayerPredictionHitterReq } from '../dtos/player-prediction-hitter.req';
import { HitterPredictionRankingRes } from '../dtos/hitter-prediction-ranking.res';
import { MyPlayerPredictionPitcherReq } from '../dtos/my-player-prediction-pitcher.req';
import { MyPlayerPredictionHitterReq } from '../dtos/my-player-prediction-hitter.req';

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

  @Get('/match/my-result')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '나의 승패 예측 결과', type: MyMatchPredictionResultRes })
  async getMyMatchPredictionResult(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Query() myMatchPredictionResultReq: MyMatchPredictionResultReq,
  ): Promise<MyMatchPredictionResultRes> {
    return await this.predictionService.getMyMatchPredictionResult(accessTokenUser, myMatchPredictionResultReq);
  }

  @Get('/match/my-history')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '나의 승패 예측 내역', type: [MyMatchPredictionHistoryRes] })
  async getMyMatchPredictionHistory(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Query() myMatchPredictionHistoryReq: MyMatchPredictionHistoryReq,
  ): Promise<MyMatchPredictionHistoryRes[]> {
    return await this.predictionService.getMyMatchPredictionHistory(accessTokenUser, myMatchPredictionHistoryReq);
  }

  @Get('/player/ranking')
  @ApiOkResponse({ description: '선수 예측 순위', type: PlayerPredictionRankingRes })
  async getPlayerPredictionRankings(
    @Query() playerPredictionRankingReq: PlayerPredictionRankingReq,
  ): Promise<PlayerPredictionRankingRes> {
    return await this.predictionService.getPlayerPredictionRankings(playerPredictionRankingReq);
  }

  @Post('/player')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '선수 예측 성공' })
  @ApiBadRequestResponse({ description: '존재하지 않는 유저입니다.' })
  async predictPlayer(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() predictPlayerReq: PredictPlayerReq,
  ) {
    return await this.predictionService.predictPlayer(accessTokenUser, predictPlayerReq);
  }

  @Patch('/player')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '선수 예측 수정 성공' })
  @ApiBadRequestResponse({ description: '존재하지 않는 유저입니다.' })
  async updatePlayerPrediction(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() updatePlayerPredictionReq: UpdatePlayerPredictionReq,
  ) {
    return await this.predictionService.updatePlayerPrediction(accessTokenUser, updatePlayerPredictionReq);
  }

  @Get('/player/pitcher')
  @ApiOkResponse({ description: '투수 예측 검색', type: [PitcherPredictionRankingRes] })
  async getPlayerPredictionPitcher(
    @Query() playerPredictionPitcher: PlayerPredictionPitcherReq,
  ): Promise<PitcherPredictionRankingRes[]> {
    return await this.predictionService.getPlayerPredictionPitcher(playerPredictionPitcher);
  }

  @Get('/player/hitter')
  @ApiOkResponse({ description: '타자 예측 검색', type: [HitterPredictionRankingRes] })
  async getPlayerPredictionHitter(
    @Query() playerPredictionHitterReq: PlayerPredictionHitterReq,
  ): Promise<HitterPredictionRankingRes[]> {
    return await this.predictionService.getPlayerPredictionHitter(playerPredictionHitterReq);
  }

  @Get('/player/pitcher/my')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '나의 투수 예측 검색', type: PitcherPredictionRankingRes })
  async getMyPlayerPredictionPitcher(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Query() myPlayerPredictionPitcherReq: MyPlayerPredictionPitcherReq,
  ): Promise<PitcherPredictionRankingRes> {
    return await this.predictionService.getMyPlayerPredictionPitcher(accessTokenUser, myPlayerPredictionPitcherReq);
  }

  @Get('/player/hitter/my')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '나의 타자 예측 검색', type: HitterPredictionRankingRes })
  async getMyPlayerPredictionHitter(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Query() myPlayerPredictionHitterReq: MyPlayerPredictionHitterReq,
  ): Promise<HitterPredictionRankingRes> {
    return await this.predictionService.getMyPlayerPredictionHitter(accessTokenUser, myPlayerPredictionHitterReq);
  }
}
