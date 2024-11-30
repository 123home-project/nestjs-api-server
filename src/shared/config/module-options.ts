import { ConfigModuleOptions } from '@nestjs/config';
import configuration from './configuration';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: `.${process.env.NODE_ENV}.env`,
  load: [configuration],
  isGlobal: true,
};
