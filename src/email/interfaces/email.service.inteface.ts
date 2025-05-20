export interface IEmailService {
  sendLocalRegisterVerifyEmail(email: string, emailAuthToken: string);
  sendResetPasswordEmail(email: string, emailAuthToken: string);
}
