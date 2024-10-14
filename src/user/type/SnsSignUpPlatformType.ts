export const SnsSignUpPlatformType = {
  Google: 'Google',
  // Naver: 'Naver',
  // Kakao: 'Kakao',
} as const;

export type SnsSignUpPlatformType = (typeof SnsSignUpPlatformType)[keyof typeof SnsSignUpPlatformType];
