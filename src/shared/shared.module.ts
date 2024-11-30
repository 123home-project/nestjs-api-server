import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './config/module-options';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.mysql.host'),
        port: configService.get('db.mysql.port'),
        database: configService.get('db.mysql.name'),
        username: configService.get('db.mysql.user'),
        password: configService.get('db.mysql.password'),
        timezone: 'Z',
        entities: ['dist/**/*.entity.{js,ts}'],
        synchronize: true,
        debug: configService.get('env') === 'development',
        autoLoadEntities: true,
      }),
    }),
  ],
  exports: [ConfigModule],
  controllers: [],
  providers: [],
})
export class SharedModule {}
