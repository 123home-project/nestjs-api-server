import { Module } from '@nestjs/common';
import { CryptoService } from './services/crypto.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: 'ICryptoService', useClass: CryptoService }],
  exports: [{ provide: 'ICryptoService', useClass: CryptoService }],
})
export class CryptoModule {}
