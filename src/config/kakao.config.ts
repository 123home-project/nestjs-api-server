import { registerAs } from '@nestjs/config';

export default registerAs('kakao', () => ({
  auth: {
    clientId: String(process.env.KAKAO_CLIENT_ID),
    clientSecret: String(process.env.KAKAO_CLIENT_SECRET),
    redirectUrl: String(process.env.KAKAO_REDIRECT_URL),
  },
}));
