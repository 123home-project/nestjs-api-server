import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './services/email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get('email.auth.address'),
            pass: configService.get('email.auth.password'),
          },
        },
        defaults: {
          from: `'일이삼홈' ${configService.get('email.auth.address')}`,
        },
      }),
    }),
  ],
  providers: [{ provide: 'IEmailService', useClass: EmailService }],
  exports: [{ provide: 'IEmailService', useClass: EmailService }],
})
export class EmailModule {}
