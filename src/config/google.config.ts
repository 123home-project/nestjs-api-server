import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  auth: {
    clientId: String(process.env.GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    redirectUrl: String(process.env.GOOGLE_REDIRECT_URL),
  },
}));
