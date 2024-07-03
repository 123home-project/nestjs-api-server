export const SignUpPlatformType = {
  Normal: 'Normal',
  Google: 'Google',
  Naver: 'Naver',
  Kakao: 'Kakao',
} as const;

export type SignUpPlatformType = typeof SignUpPlatformType[keyof typeof SignUpPlatformType];