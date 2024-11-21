import { ConfigModuleOptions } from '@nestjs/config';
import googleConfig from './google.config';

export default (): ConfigModuleOptions => ({
  envFilePath: `src/config/env/.${process.env.NODE_ENV}.env`,
  load: [googleConfig],
  isGlobal: true,
});
