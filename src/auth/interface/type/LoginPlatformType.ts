export const LoginPlatformType = {
  Normal: 'Normal',
  Google: 'Google',
  Naver: 'Naver',
  Kakao: 'Kakao',
} as const;

export type LoginPlatformType = (typeof LoginPlatformType)[keyof typeof LoginPlatformType];
