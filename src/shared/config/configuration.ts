export default (): any => ({
  google: {
    auth: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      redirectUrl: String(process.env.GOOGLE_REDIRECT_URL),
    },
  },
  kakao: {
    auth: {
      clientId: String(process.env.KAKAO_CLIENT_ID),
      clientSecret: String(process.env.KAKAO_CLIENT_SECRET),
      redirectUrl: String(process.env.KAKAO_REDIRECT_URL),
    },
  },
  naver: {
    auth: {
      clientId: String(process.env.NAVER_CLIENT_ID),
      clientSecret: String(process.env.NAVER_CLIENT_SECRET),
      redirectUrl: String(process.env.NAVER_REDIRECT_URL),
    },
  },
  jwt: {
    secret: String(process.env.JWT_SECRET),
    accessTokenExpires: String(process.env.JWT_ACCESS_TOKEN_EXPIRES),
    refreshTokenExpires: String(process.env.JWT_REFRESH_TOKEN_EXPIRES),
  },
  db: {
    mysql: {
      host: String(process.env.DB_MYSQL_HOST),
      port: String(process.env.DB_MYSQL_PORT),
      name: String(process.env.DB_MYSQL_NAME),
      user: String(process.env.DB_MYSQL_USER),
      password: String(process.env.DB_MYSQL_PASSWORD),
    },
  },
  email: {
    auth: {
      address: String(process.env.AUTH_EMAIL_ADDRESS),
      password: String(process.env.AUTH_EMAIL_PASSWORD),
    },
  },
  encryption: {
    twoway: {
      key: String(process.env.TWO_WAY_ENCRYPT_KEY),
    },
  },
});
