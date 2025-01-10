import { Injectable } from '@nestjs/common';
import { ICryptoService } from '../interfaces/crypto.service.interface';
import * as crypto from 'crypto';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService implements ICryptoService {
  constructor(private readonly configService: ConfigService) {}

  async passwordEcrypt(password: string): Promise<string> {
    return await hash(password, 10);
  }

  async passwordMatch(inputPassword: string, existingPassword: string): Promise<boolean> {
    return await compare(inputPassword, existingPassword);
  }

  twoWayEncrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(this.configService.get('encryption.twoway.key'));
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypt = cipher.update(text, 'utf8', 'hex');
    const encrypted = encrypt + cipher.final('hex');
    return `${encrypted}:${iv.toString('hex')}`;
  }

  twoWayDecrypt(encryptedText: string): string {
    const [ivHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.configService.get('encryption.twoway.key'), iv);
    const decrypt = decipher.update(encrypted, 'hex', 'utf8');
    const decrypted = decrypt + decipher.final('utf8');

    return decrypted;
  }
}
