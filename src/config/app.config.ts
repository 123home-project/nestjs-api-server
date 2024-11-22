import { ConfigModuleOptions } from '@nestjs/config';
import googleConfig from './google.config';
import kakaoConfig from './kakao.config';
import naverConfig from './naver.config';

export default (): ConfigModuleOptions => ({
  envFilePath: `src/config/env/.${process.env.NODE_ENV}.env`,
  load: [googleConfig, kakaoConfig, naverConfig],
  isGlobal: true,
});
