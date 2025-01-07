import { Injectable } from '@nestjs/common';
import { IEmailService } from '../interfaces/email.service.inteface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService implements IEmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendLocalRegisterVerifyEmail(email: string, emailAuthToken: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: '[일이삼홈] 일이삼홈 인증안내',
      html: `인증하고싶으면 아래 버튼 클릭 ${emailAuthToken}`,
    });
  }
}
