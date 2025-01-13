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
      html: `
        계정 인증을 위해 아래 링크를 클릭해주세요 
        <p><p>
        <a href="http://127.0.0.1:4321/auth/email?emailauthtoken=${emailAuthToken}">계정 인증 하기</a>
      `,
    });
  }

  async sendResetPasswordEmail(email: string, emailAuthToken: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: '[일이삼홈] 일이삼홈 비밀번호 변경 안내',
      html: `
        비밀번호 변경을 위해 새로운 비밀번호를 입력해주세요 
        <p><p>
        <a href="https://www.naver.com?emailauthtoken=${emailAuthToken}">비밀 번호 입력</a>
      `,
    });
  }
}
