import { registerAs } from '@nestjs/config';

export default registerAs('naver', () => ({
  auth: {
    clientId: String(process.env.NAVER_CLIENT_ID),
    clientSecret: String(process.env.NAVER_CLIENT_SECRET),
    redirectUrl: String(process.env.NAVER_REDIRECT_URL),
  },
}));
