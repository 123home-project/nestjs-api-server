export interface ICryptoService {
  passwordEcrypt(password: string): Promise<string>;
  passwordMatch(inputPassword: string, existingPassword: string): Promise<boolean>;
  twoWayEncrypt(text: string): string;
  twoWayDecrypt(encryptedText: string): string;
}
