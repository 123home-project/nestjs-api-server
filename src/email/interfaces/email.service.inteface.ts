export interface IEmailService {
  sendLocalRegisterVerifyEmail(email: string, emailAuthToken: string);
}
