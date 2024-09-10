import { SignUpPlatformType } from "src/user/type/SignUpPlatformType";

export class SignUpCommand {
  constructor(
    readonly platform: SignUpPlatformType,
    readonly id: string,
    readonly pw: string,
  ) {}
}